import React, { useState } from 'react';
import { Building, MapPin, Target, Calendar } from 'lucide-react';
import { ApplicationModal } from './ApplicationModal';

interface OrganizationApplication {
  id: string;
  organization_name: string;
  country_registration: string;
  legal_status: string;
  founding_date: string;
  address: string;
  website: string;
  organization_email: string;
  organization_phone?: string;
  mission_statement: string;
  primary_category: string;
  geographic_focus: string;
  programs_services: string;
  beneficiaries: string;
  achievements?: string;
  status: string;
  created_at: string;
}

interface ApplicationsListProps {
  applications: OrganizationApplication[];
}

export function ApplicationsList({ applications }: ApplicationsListProps) {
  const [selectedApplication, setSelectedApplication] = useState<OrganizationApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (application: OrganizationApplication) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-green-900/50 text-green-300`;
      case 'rejected':
        return `${baseClasses} bg-red-900/50 text-red-300`;
      case 'under_review':
        return `${baseClasses} bg-yellow-900/50 text-yellow-300`;
      default:
        return `${baseClasses} bg-gray-900/50 text-gray-300`;
    }
  };

  console.log('ApplicationsList received applications:', applications);

  return (
    <>
      <section className="py-12 relative bg-gradient-to-r from-gray-900/50 to-slate-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Organization Applications</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              View submitted applications from organizations. These may be approved, rejected, or under review. Click on any card to learn more.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Total applications found: {applications.length}
            </p>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <Building className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No applications found. This could be due to database permissions or all applications are still pending approval.</p>
              <p className="text-gray-500 text-sm mt-2">Check the browser console for debugging information.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-none">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => openModal(app)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white truncate">{app.organization_name}</h3>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={getStatusBadge(app.status)}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1).replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-300 text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{app.country_registration}</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Target className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{app.primary_category}</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Founded {app.founding_date}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                      {app.mission_statement}
                    </p>

                    <div className="text-center">
                      <span className="text-blue-400 text-sm font-medium">Click to view details</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ApplicationModal 
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}