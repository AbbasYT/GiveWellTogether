import React from 'react';
import { PieChart, Shield } from 'lucide-react';
import { formatPrice } from '../../stripe-config';

interface OrganizationDistribution {
  name: string;
  category: string;
  amount: number;
  percentage: number;
}

interface DistributionBreakdownProps {
  organizations: OrganizationDistribution[];
}

export function DistributionBreakdown({ organizations }: DistributionBreakdownProps) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="flex items-center mb-6">
        <PieChart className="h-8 w-8 text-purple-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Distribution Breakdown</h2>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-300 mb-4">
          Your monthly contribution is distributed equally among all verified partner organizations:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {organizations.map((org, index) => (
            <div key={index} className="bg-gray-700/50 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-white">{org.name}</div>
                <div className="text-blue-400 font-bold">{org.percentage.toFixed(1)}%</div>
              </div>
              <div className="text-sm text-gray-300 mb-2">{org.category}</div>
              <div className="text-green-400 font-semibold">{formatPrice(org.amount)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-900/30 rounded-2xl p-4 border border-blue-700/50">
        <div className="flex items-center text-blue-300">
          <Shield className="h-5 w-5 mr-2" />
          <span className="text-sm">
            Equal distribution ensures fair support across all verified organizations. 
            This approach maximizes collective impact and prevents popularity bias.
          </span>
        </div>
      </div>
    </div>
  );
}