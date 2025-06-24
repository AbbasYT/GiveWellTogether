import React from 'react';
import { X, MapPin, Target, Calendar, Award, Mail, Phone, Building } from 'lucide-react';

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

interface ApplicationModalProps {
  application: OrganizationApplication | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ application, isOpen, onClose }: ApplicationModalProps) {
  if (!isOpen || !application) return null;

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-semibold';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-800/95 backdrop-blur-sm rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{application.organization_name}</h2>
              <span className={getStatusBadge(application.status)}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace('_', ' ')}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-400">Country</div>
                  <div className="font-medium">{application.country_registration}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-300">
                <Target className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="font-medium">{application.primary_category}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-400">Founded</div>
                  <div className="font-medium">{application.founding_date}</div>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Mission Statement</h3>
              <p className="text-gray-300 leading-relaxed">{application.mission_statement}</p>
            </div>

            {/* Legal Status */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Legal Status</h3>
              <p className="text-gray-300">{application.legal_status}</p>
            </div>

            {/* Geographic Focus */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Geographic Focus</h3>
              <p className="text-gray-300">{application.geographic_focus}</p>
            </div>

            {/* Programs & Services */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Programs & Services</h3>
              <p className="text-gray-300 leading-relaxed">{application.programs_services}</p>
            </div>

            {/* Beneficiaries */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Beneficiaries</h3>
              <p className="text-gray-300 leading-relaxed">{application.beneficiaries}</p>
            </div>

            {/* Achievements */}
            {application.achievements && (
              <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </h3>
                <p className="text-gray-300 leading-relaxed">{application.achievements}</p>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-400">Address</div>
                    <div>{application.address}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Mail className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <a 
                      href={`mailto:${application.organization_email}`}
                      className="text-blue-400 hover:text-blue-300 underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {application.organization_email}
                    </a>
                  </div>
                </div>

                {application.organization_phone && (
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-400">Phone</div>
                      <a 
                        href={`tel:${application.organization_phone}`}
                        className="text-blue-400 hover:text-blue-300 underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {application.organization_phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center text-gray-300">
                  <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Website</div>
                    <a 
                      href={application.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {application.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Date */}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Application submitted on {new Date(application.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}