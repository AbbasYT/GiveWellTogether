import React, { useState } from 'react';
import { Receipt, Download, Calendar, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useSubscription } from '../../hooks/useSubscription';
import { supabase } from '../../lib/supabase';
import { getProductByPriceId, formatPrice } from '../../stripe-config';
import jsPDF from 'jspdf';

interface TaxDocumentsSectionProps {
  onSaveSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function TaxDocumentsSection({ onSaveSuccess, onError }: TaxDocumentsSectionProps) {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const [loading, setLoading] = useState(false);

  const generateInvoicePDF = async (period: 'current_month' | 'current_year') => {
    setLoading(true);
    
    try {
      // Fetch user's order history
      const { data: orders, error: ordersError } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (ordersError) throw ordersError;

      // Get current subscription plan details
      const currentPlan = subscription?.price_id ? getProductByPriceId(subscription.price_id) : null;

      // Filter orders based on period
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0-based (June = 5)

      let filteredOrders = orders || [];
      let periodLabel = '';

      // Check if we have valid orders (not from 1970)
      const validOrders = orders?.filter(order => {
        const orderDate = new Date(order.order_date);
        const orderYear = orderDate.getFullYear();
        return orderYear > 1990; // Filter out obviously wrong dates
      }) || [];

      if (period === 'current_month') {
        filteredOrders = validOrders.filter(order => {
          const orderDate = new Date(order.order_date);
          const orderYear = orderDate.getFullYear();
          const orderMonth = orderDate.getMonth();
          return orderYear === currentYear && orderMonth === currentMonth;
        });
        periodLabel = `${now.toLocaleString('default', { month: 'long' })} ${currentYear}`;
      } else {
        filteredOrders = validOrders.filter(order => {
          const orderDate = new Date(order.order_date);
          const orderYear = orderDate.getFullYear();
          return orderYear === currentYear;
        });
        periodLabel = `${currentYear}`;
      }

      if (filteredOrders.length === 0) {
        // Provide more detailed error message
        const totalOrdersCount = orders?.length || 0;
        const validOrdersCount = validOrders.length;
        
        if (totalOrdersCount === 0) {
          onError(`No payment history found. You may not have any completed payments yet.`);
        } else if (validOrdersCount === 0) {
          onError(`Payment data appears to be corrupted (showing dates from 1970). Please contact support to resolve this issue.`);
        } else {
          // Show available dates to help user understand
          const availableDates = validOrders.map(order => {
            const date = new Date(order.order_date);
            return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
          }).join(', ');
          
          onError(`No payments found for ${periodLabel}. You have ${validOrdersCount} valid payment(s) from: ${availableDates}`);
        }
        return;
      }

      // Calculate totals
      const totalAmount = filteredOrders.reduce((sum, order) => sum + (order.amount_total || 0), 0);

      // Generate PDF
      generatePDF({
        user,
        orders: filteredOrders,
        totalAmount,
        period: periodLabel,
        currentPlan
      });
      
      onSaveSuccess(`Tax invoice for ${periodLabel} downloaded successfully as PDF.`);
    } catch (err) {
      onError('Failed to generate tax invoice');
      console.error('Invoice generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = ({ user, orders, totalAmount, period, currentPlan }: any) => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    
    // Set up colors
    const primaryBlue = '#2563eb';
    const darkGray = '#1f2937';
    const lightGray = '#6b7280';
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(primaryBlue);
    doc.text('GiveWellTogether', 105, 30, { align: 'center' });
    
    doc.setFontSize(18);
    doc.setTextColor(darkGray);
    doc.text('Tax Invoice', 105, 45, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(lightGray);
    doc.text(`Period: ${period}`, 105, 55, { align: 'center' });
    
    // Draw header line
    doc.setDrawColor(primaryBlue);
    doc.setLineWidth(1);
    doc.line(20, 65, 190, 65);
    
    // Bill To section
    doc.setFontSize(14);
    doc.setTextColor(darkGray);
    doc.text('Bill To:', 20, 80);
    
    doc.setFontSize(11);
    doc.setTextColor('#000000');
    doc.text(user?.email || 'N/A', 20, 90);
    doc.text(`Customer ID: ${user?.id?.substring(0, 8)}...`, 20, 100);
    doc.text(`Invoice Date: ${currentDate}`, 20, 110);
    
    // Service Provider section
    doc.setFontSize(14);
    doc.setTextColor(darkGray);
    doc.text('Service Provider:', 120, 80);
    
    doc.setFontSize(11);
    doc.setTextColor('#000000');
    doc.text('GiveWellTogether', 120, 90);
    doc.text('Charitable Giving Platform', 120, 100);
    doc.text('support@givewelltogether.com', 120, 110);
    
    // Subscription details (if available)
    let yPosition = 130;
    if (currentPlan) {
      doc.setFontSize(14);
      doc.setTextColor(darkGray);
      doc.text('Subscription Details:', 20, yPosition);
      
      doc.setFontSize(11);
      doc.setTextColor('#000000');
      doc.text(`Plan: ${currentPlan.name}`, 20, yPosition + 10);
      doc.text(`Amount: ${formatPrice(currentPlan.price)} per ${currentPlan.interval}`, 20, yPosition + 20);
      
      yPosition += 40;
    }
    
    // Table header
    doc.setFontSize(12);
    doc.setTextColor('#000000');
    doc.setFillColor(249, 250, 251); // Light gray background
    doc.rect(20, yPosition, 170, 10, 'F');
    
    doc.text('Date', 25, yPosition + 7);
    doc.text('Description', 60, yPosition + 7);
    doc.text('Amount', 130, yPosition + 7);
    doc.text('Status', 160, yPosition + 7);
    
    // Draw table border
    doc.setDrawColor('#e5e7eb');
    doc.rect(20, yPosition, 170, 10);
    
    yPosition += 10;
    
    // Table rows
    orders.forEach((order: any, index: number) => {
      const rowY = yPosition + (index * 10);
      
      // Alternate row background
      if (index % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, rowY, 170, 10, 'F');
      }
      
      doc.setFontSize(10);
      doc.setTextColor('#000000');
      
      const orderDate = new Date(order.order_date).toLocaleDateString();
      doc.text(orderDate, 25, rowY + 7);
      doc.text('Charitable Donation Subscription', 60, rowY + 7);
      doc.text(formatPrice(order.amount_total), 130, rowY + 7);
      doc.text(order.order_status, 160, rowY + 7);
      
      // Draw row border
      doc.setDrawColor('#e5e7eb');
      doc.rect(20, rowY, 170, 10);
    });
    
    // Total row
    const totalRowY = yPosition + (orders.length * 10);
    doc.setFillColor(243, 244, 246); // Slightly darker gray
    doc.rect(20, totalRowY, 170, 10, 'F');
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(`Total for ${period}`, 25, totalRowY + 7);
    doc.text(formatPrice(totalAmount), 130, totalRowY + 7);
    
    doc.setDrawColor('#e5e7eb');
    doc.rect(20, totalRowY, 170, 10);
    
    // Tax notice
    const taxNoticeY = totalRowY + 25;
    doc.setFillColor(254, 243, 199); // Yellow background
    doc.rect(20, taxNoticeY, 170, 25, 'F');
    doc.setDrawColor('#f59e0b');
    doc.rect(20, taxNoticeY, 170, 25);
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor('#92400e');
    doc.text('Tax Deductibility Notice', 25, taxNoticeY + 8);
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text('All donations made through GiveWellTogether are tax-deductible to the extent', 25, taxNoticeY + 15);
    doc.text('allowed by law. This invoice serves as your receipt for tax purposes.', 25, taxNoticeY + 22);
    
    // Footer
    const footerY = taxNoticeY + 40;
    doc.setFontSize(10);
    doc.setTextColor(lightGray);
    doc.text('Thank you for making a difference through GiveWellTogether!', 105, footerY, { align: 'center' });
    doc.text(`This invoice was generated on ${currentDate}`, 105, footerY + 8, { align: 'center' });
    doc.text('GiveWellTogether - One Subscription. Countless Lives Changed.', 105, footerY + 16, { align: 'center' });
    
    // Save the PDF
    const filename = `GiveWellTogether_Invoice_${period.replace(' ', '_')}.pdf`;
    doc.save(filename);
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="flex items-center mb-6">
        <Receipt className="h-6 w-6 text-green-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Tax Documents</h2>
      </div>

      <div className="mb-4 p-3 bg-green-900/30 rounded-lg border border-green-700/50">
        <p className="text-green-300 text-sm">
          Download tax invoices for your charitable donations. All donations are tax-deductible to the extent allowed by law.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => generateInvoicePDF('current_month')}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {loading ? 'Generating...' : 'Download Monthly Invoice'}
          </Button>

          <Button
            onClick={() => generateInvoicePDF('current_year')}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            {loading ? 'Generating...' : 'Download Yearly Invoice'}
          </Button>
        </div>

        <div className="p-4 bg-gray-700/50 rounded-lg">
          <h3 className="text-white font-semibold mb-2 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Direct PDF Download
          </h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Click any button above to instantly download a PDF invoice</li>
            <li>• No additional steps required - the PDF is ready for your records</li>
            <li>• Professional formatting optimized for tax documentation</li>
            <li>• Includes all payment details and tax deductibility information</li>
          </ul>
        </div>

        <div className="p-4 bg-gray-700/50 rounded-lg">
          <h3 className="text-white font-semibold mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Invoice Information
          </h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Monthly Invoice: All payments made in the current month</li>
            <li>• Yearly Invoice: Comprehensive invoice for all payments this year</li>
            <li>• All invoices include payment details and tax deductibility information</li>
            <li>• Keep these invoices for your tax records</li>
          </ul>
        </div>

        <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700/50">
          <p className="text-yellow-300 text-sm">
            <strong>Note:</strong> Please consult with your tax advisor for specific guidance on charitable deductions. 
            These invoices serve as official receipts for tax purposes.
          </p>
        </div>
      </div>
    </div>
  );
}