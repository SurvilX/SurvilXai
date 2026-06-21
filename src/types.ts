export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'alerting';
  riskScore: number;
  activityType?: string;
  timestamp: string;
  videoUrl?: string; // We can use canvas/animations to simulate AI detection boxes on these feeds
}

export interface SecurityIncident {
  id: string;
  location: string;
  camera: string;
  time: string;
  type: string;
  status: 'pending' | 'verified' | 'false_alarm';
  riskScore: number;
  description: string;
  screenshotUrl?: string;
  assignedTo?: string;
}

export interface StatItem {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  iconName: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
  imageAccent: string;
}

export interface IndustryCard {
  id: string;
  title: string;
  description: string;
  metrics: string;
  imageTopic: string;
  hoverFeature: string;
}

export interface AuditFormData {
  fullName: string;
  companyName: string;
  businessType: string;
  numberOfLocations: string;
  phone: string;
  email: string;
  message: string;
}
