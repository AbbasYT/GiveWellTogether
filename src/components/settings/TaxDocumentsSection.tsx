import React, { useState } from 'react';
import { Receipt, Download, Calendar, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useSubscription } from '../../hooks/useSubscription';
import { supabase } from '../../lib/supabase';
import { getProductByPriceId, formatPrice } from '../../stripe-config';

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

      // Generate PDF content
      const pdfContent = generatePDFContent({
        user,
        orders: filteredOrders,
        totalAmount,
        period: periodLabel,
        currentPlan
      });

      // Create and download PDF
      downloadPDF(pdfContent, `GiveWellTogether_Invoice_${periodLabel.replace(' ', '_')}.pdf`);
      
      onSaveSuccess(`Tax invoice for ${periodLabel} downloaded successfully`);
    } catch (err) {
      onError('Failed to generate tax invoice');
      console.error('Invoice generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generatePDFContent = ({ user, orders, totalAmount, period, currentPlan }: any) => {
    const currentDate = new Date().toLocaleDateString();
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>GiveWellTogether Tax Invoice - ${period}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
        .company-name { font-size: 28px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
        .invoice-title { font-size: 24px; color: #1f2937; margin-bottom: 5px; }
        .period { font-size: 16px; color: #6b7280; }
        .details { display: flex; justify-content: space-between; margin: 30px 0; }
        .details-section { flex: 1; }
        .details-section h3 { color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
        .table { width: 100%; border-collapse: collapse; margin: 30px 0; }
        .table th, .table td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
        .table th { background-color: #f9fafb; font-weight: bold; }
        .total-row { background-color: #f3f4f6; font-weight: bold; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
        .tax-note { background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">GiveWellTogether</div>
        <div class="invoice-title">Tax Invoice</div>
        <div class="period">Period: ${period}</div>
    </div>

    <div class="details">
        <div class="details-section">
            <h3>Bill To:</h3>
            <p><strong>${user?.email}</strong></p>
            <p>Customer ID: ${user?.id}</p>
            <p>Invoice Date: ${currentDate}</p>
        </div>
        <div class="details-section">
            <h3>Service Provider:</h3>
            <p><strong>GiveWellTogether</strong></p>
            <p>Charitable Giving Platform</p>
            <p>Tax ID: [Tax ID Number]</p>
        </div>
    </div>

    ${currentPlan ? `
    <div class="details-section">
        <h3>Subscription Details:</h3>
        <p><strong>Plan:</strong> ${currentPlan.name}</p>
        <p><strong>Amount:</strong> ${formatPrice(currentPlan.price)} per ${currentPlan.interval}</p>
    </div>
    ` : ''}

    <table class="table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            ${orders.map((order: any) => `
                <tr>
                    <td>${new Date(order.order_date).toLocaleDateString()}</td>
                    <td>Charitable Donation Subscription</td>
                    <td>${formatPrice(order.amount_total)}</td>
                    <td style="color: #059669; text-transform: capitalize;">${order.order_status}</td>
                </tr>
            `).join('')}
            <tr class="total-row">
                <td colspan="2"><strong>Total for ${period}</strong></td>
                <td><strong>${formatPrice(totalAmount)}</strong></td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <div class="tax-note">
        <h3 style="margin-top: 0; color: #92400e;">Tax Deductibility Notice</h3>
        <p style="margin-bottom: 0; color: #92400e;">
            All donations made through GiveWellTogether are tax-deductible to the extent allowed by law. 
            This invoice serves as your receipt for tax purposes. Please consult with your tax advisor 
            for specific guidance on charitable deductions.
        </p>
    </div>

    <div class="footer">
        <p><strong>Thank you for making a difference through GiveWellTogether!</strong></p>
        <p>This invoice was generated on ${currentDate}. For questions about this invoice, please contact support@givewelltogether.com</p>
        <p>GiveWellTogether - One Subscription. Countless Lives Changed.</p>
    </div>
</body>
</html>
    `;
  };

  const downloadPDF = (htmlContent: string, filename: string) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      onError('Please allow popups to download the invoice');
      return;
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then trigger print dialog
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Note: In a real implementation, you'd want to use a proper PDF generation library
        // like jsPDF or Puppeteer on the backend for better PDF quality
      }, 500);
    };
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
            {loading ? 'Generating...' : 'Current Month Invoice'}
          </Button>

          <Button
            onClick={() => generateInvoicePDF('current_year')}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            {loading ? 'Generating...' : 'Current Year Invoice'}
          </Button>
        </div>

        <div className="p-4 bg-gray-700/50 rounded-lg">
          <h3 className="text-white font-semibold mb-2 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Invoice Information
          </h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Current Month: Invoice for payments made this month</li>
            <li>• Current Year: Comprehensive invoice for all payments this year</li>
            <li>• All invoices include payment details and tax deductibility information</li>
            <li>• Invoices are generated in PDF format for easy printing and filing</li>
          </ul>
        </div>

        <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700/50">
          <p className="text-yellow-300 text-sm">
            <strong>Note:</strong> Please consult with your tax advisor for specific guidance on charitable deductions. 
            Keep these invoices for your tax records.
          </p>
        </div>
      </div>
    </div>
  );
}