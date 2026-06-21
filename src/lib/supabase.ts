// SurvilX Secure Database client layer
// All database transactions are made directly through the client-side Supabase SDK.
// Sensitive keys are loaded from environment variables prefixed with VITE_.

import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabaseUrl = rawUrl.trim();
const supabaseAnonKey = rawKey.trim();

const isValueValid = (val: string) => {
  return val !== '' && !val.includes('placeholder') && !val.includes('MY_APP_URL');
};

export const isSupabaseConfigured = isValueValid(supabaseUrl) && isValueValid(supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Local fallback in-memory store for state tracking in case database is offline/unconfigured
let employeesCache: any[] = [];
let contactsCache: any[] = [];
let keyLogsCache: any[] = [];
let applicantsCache: any[] = [
  {
    id: 'APP-8391',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '9876123450',
    address: 'Indiranagar, Bangalore, Karnataka',
    education: 'M.Tech Computer Science',
    completedAt: '18/06/2026',
    role: 'Threat Detection Specialist',
    status: 'Applied'
  },
  {
    id: 'APP-2948',
    fullName: 'Priya Patel',
    email: 'priya.patel@outlook.com',
    phone: '8123004561',
    address: 'Andheri West, Mumbai, Maharashtra',
    education: 'B.E. Information Technology',
    completedAt: '16/06/2026',
    role: 'FIDO Protocol Security Engineer',
    status: 'Applied'
  }
];
let yubiOrdersCache: any[] = [
  {
    id: 'ORD-9021',
    fullName: 'Amit Kumar',
    phone: '9876543210',
    address: 'Flat 304, Cyber Oasis, Sector 62, Noida, Uttar Pradesh - 201301',
    quantity: 2,
    keyType: 'YubiKey 5C (COD ₹4,000)',
    orderedAt: '18/06/2026 14:24'
  },
  {
    id: 'ORD-7742',
    fullName: 'Sneha Reddy',
    phone: '8123456789',
    address: 'Plot No. 45, Jubilee Hills, Road No. 10, Hyderabad, Telangana - 500033',
    quantity: 1,
    keyType: 'YubiKey 5C NFC (Promo ₹0)',
    orderedAt: '17/06/2026 11:05'
  }
];
let incidentsCache: any[] = [
  { id: '1', location: 'Grocery Site B', camera: 'Aisle 07', time: '14:36:44', type: 'Product Concealment', status: 'pending', riskScore: 92, description: 'Skeletal track identified item passing from rack to jacket interior pocket.' },
  { id: '2', location: 'Warehouse Central', camera: 'South Fence Yard', time: '14:12:05', type: 'After-Hours Foot Intrusion', status: 'verified', riskScore: 84, description: 'Human outline identified crossing fence perimeter at 02:11am.' },
  { id: '3', location: 'Convenience Site C', camera: 'POS Counter 01', time: '13:58:33', type: 'Unattended Cash Tray', status: 'false_alarm', riskScore: 45, description: 'Drawer remained open after employee step-away, analyzed as housekeeping error.' }
];

export const db = {
  // --- EMPLOYEES ---
  async getEmployees(): Promise<any[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .order('completed_at', { ascending: false });
        if (!error && data) {
          return data.map((emp: any) => ({
            id: emp.id,
            employeeId: emp.employee_id,
            email: emp.email,
            password: emp.password,
            fullName: emp.full_name,
            firstName: emp.first_name,
            lastName: emp.last_name,
            phone: emp.phone,
            address: emp.address,
            education: emp.education,
            photoUrl: emp.photo_url,
            signaturePath: emp.signature_path,
            completedAt: emp.completed_at ? new Date(emp.completed_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '18 June 2026'
          }));
        }
        console.error('getEmployees database error:', error);
      } catch (err) {
        console.error('getEmployees catch:', err);
      }
    }
    return employeesCache;
  },

  async insertEmployee(emp: any): Promise<boolean> {
    const exists = employeesCache.some((e: any) => e.employeeId === emp.employeeId);
    if (!exists) {
      employeesCache = [emp, ...employeesCache];
    } else {
      employeesCache = employeesCache.map((e: any) => e.employeeId === emp.employeeId ? emp : e);
    }

    if (supabase) {
      try {
        const { error } = await supabase.from('employees').upsert([
          {
            employee_id: emp.employeeId,
            email: emp.email,
            password: emp.password,
            full_name: emp.fullName,
            first_name: emp.firstName,
            last_name: emp.lastName,
            phone: emp.phone,
            address: emp.address,
            education: emp.education,
            photo_url: emp.photoUrl,
            signature_path: emp.signaturePath,
            completed_at: new Date().toISOString()
          }
        ], { onConflict: 'employee_id' });
        if (error) {
          console.error('insertEmployee database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('insertEmployee catch:', err);
        return false;
      }
    }
    return true;
  },

  async deleteEmployee(employeeId: string): Promise<boolean> {
    employeesCache = employeesCache.filter((emp: any) => emp.employeeId !== employeeId);

    if (supabase) {
      try {
        const { error } = await supabase
          .from('employees')
          .delete()
          .eq('employee_id', employeeId);
        if (error) {
          console.error('deleteEmployee database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('deleteEmployee catch:', err);
        return false;
      }
    }
    return true;
  },

  // --- CONTACT AUDITS ---
  async getContacts(): Promise<any[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('survilx_contacts')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data.map((item: any) => ({
            fullName: item.full_name,
            companyName: item.company_name,
            businessType: item.business_type,
            numberOfLocations: item.number_of_locations,
            phone: item.phone,
            email: item.email,
            message: item.message,
            created_at: item.created_at
          }));
        }
        console.error('getContacts database error:', error);
      } catch (err) {
        console.error('getContacts fetch error:', err);
      }
    }
    return contactsCache;
  },

  async insertContact(contact: any): Promise<boolean> {
    const newContact = { 
      ...contact, 
      id: contact.id || Math.random().toString(), 
      created_at: contact.created_at || new Date().toISOString() 
    };
    contactsCache = [newContact, ...contactsCache];

    if (supabase) {
      try {
        const { error } = await supabase.from('survilx_contacts').insert([
          {
            full_name: contact.fullName,
            company_name: contact.companyName,
            business_type: contact.businessType,
            number_of_locations: contact.numberOfLocations,
            phone: contact.phone,
            email: contact.email,
            message: contact.message
          }
        ]);
        if (error) {
          console.error('insertContact database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('insertContact catch error:', err);
        return false;
      }
    }
    return true;
  },

  // --- SECURITY THREAT INCIDENTS ---
  async getIncidents(): Promise<any[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('survilx_incidents')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data.map((inc: any) => ({
            id: inc.id,
            incidentId: inc.incident_id,
            location: inc.location,
            camera: inc.camera,
            time: inc.time,
            type: inc.type,
            status: inc.status,
            riskScore: inc.risk_score,
            description: inc.description
          }));
        }
        console.error('getIncidents database error:', error);
      } catch (err) {
        console.error('getIncidents fetch error:', err);
      }
    }
    return incidentsCache;
  },

  async updateIncidentStatus(id: string, status: 'pending' | 'verified' | 'false_alarm'): Promise<boolean> {
    incidentsCache = incidentsCache.map((inc) => inc.id === id ? { ...inc, status } : inc);

    if (supabase) {
      try {
        const { error } = await supabase
          .from('survilx_incidents')
          .update({ status })
          .eq('id', id);
        if (error) {
          console.error('updateIncident database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('updateIncident catch error:', err);
        return false;
      }
    }
    return true;
  },

  async insertIncident(incident: any): Promise<boolean> {
    const newInc = {
      id: incident.id || Math.random().toString(),
      incidentId: incident.incidentId || `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      location: incident.location,
      camera: incident.camera,
      time: incident.time || 'Just now',
      type: incident.type,
      status: incident.status || 'pending',
      riskScore: incident.riskScore || 75,
      description: incident.description
    };
    incidentsCache = [newInc, ...incidentsCache];

    if (supabase) {
      try {
        const { error } = await supabase.from('survilx_incidents').insert([
          {
            incident_id: newInc.incidentId,
            location: newInc.location,
            camera: newInc.camera,
            time: newInc.time,
            type: newInc.type,
            status: newInc.status,
            risk_score: newInc.riskScore,
            description: newInc.description
          }
        ]);
        if (error) {
          console.error('insertIncident database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('insertIncident catch error:', err);
        return false;
      }
    }
    return true;
  },

  // --- PASSKEY / AUDIT LOGS ---
  async getKeyLogs(): Promise<any[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('survilx_key_logs')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data;
        }
        console.error('getKeyLogs database error:', error);
      } catch (err) {
        console.error('getKeyLogs fetch error:', err);
      }
    }
    return keyLogsCache;
  },

  async insertKeyLog(log: any): Promise<boolean> {
    const newLog = { 
      id: log.id || Math.random().toString(), 
      email: log.email || 'anonymous',
      action_type: log.action_type || 'Passkey Setup',
      key_type: log.key_type || 'YubiKey 5C NFC',
      ip_address: log.ip_address || '127.0.0.1',
      created_at: log.created_at || new Date().toISOString()
    };
    keyLogsCache = [newLog, ...keyLogsCache];

    if (supabase) {
      try {
        const { error } = await supabase.from('survilx_key_logs').insert([
          {
            email: newLog.email,
            action_type: newLog.action_type,
            key_type: newLog.key_type,
            ip_address: newLog.ip_address
          }
        ]);
        if (error) {
          console.error('insertKeyLog database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('insertKeyLog catch error:', err);
        return false;
      }
    }
    return true;
  },

  // --- JOB APPLICANTS ---
  async getApplicants(): Promise<any[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('job_applicants')
          .select('*')
          .order('completed_at', { ascending: false });
        if (!error && data) {
          return data.map((item: any) => ({
            id: item.id,
            fullName: item.full_name,
            email: item.email,
            phone: item.phone,
            address: item.address,
            education: item.education,
            role: item.role,
            status: item.status,
            completedAt: item.completed_at ? new Date(item.completed_at).toLocaleDateString('en-GB') : '18/06/2026'
          }));
        }
        console.error('getApplicants database error:', error);
      } catch (err) {
        console.error('getApplicants fetch error:', err);
      }
    }
    return applicantsCache;
  },

  async insertApplicant(applicant: any): Promise<boolean> {
    const newApplicant = {
      ...applicant,
      id: applicant.id || `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      completedAt: applicant.completedAt || new Date().toLocaleDateString('en-GB')
    };
    applicantsCache = [newApplicant, ...applicantsCache];

    if (supabase) {
      try {
        const { error } = await supabase.from('job_applicants').insert([
          {
            id: newApplicant.id,
            full_name: newApplicant.fullName,
            email: newApplicant.email,
            phone: newApplicant.phone,
            address: newApplicant.address,
            education: newApplicant.education,
            role: newApplicant.role,
            status: newApplicant.status,
            completed_at: new Date().toISOString()
          }
        ]);
        if (error) {
          console.error('insertApplicant database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('insertApplicant catch error:', err);
        return false;
      }
    }
    return true;
  },

  async deleteApplicant(id: string): Promise<boolean> {
    applicantsCache = applicantsCache.filter(app => app.id !== id);

    if (supabase) {
      try {
        const { error } = await supabase
          .from('job_applicants')
          .delete()
          .eq('id', id);
        if (error) {
          console.error('deleteApplicant database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('deleteApplicant catch error:', err);
        return false;
      }
    }
    return true;
  },

  // --- YUBIKEY ORDERS ---
  async getYubiOrders(): Promise<any[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('yubikey_orders')
          .select('*')
          .order('ordered_at', { ascending: false });
        if (!error && data) {
          return data.map((item: any) => ({
            id: item.id,
            fullName: item.full_name,
            phone: item.phone,
            address: item.address,
            quantity: item.quantity,
            keyType: item.key_type,
            orderedAt: item.ordered_at ? new Date(item.ordered_at).toLocaleString('en-IN') : '18/06/2026 14:24'
          }));
        }
        console.error('getYubiOrders database error:', error);
      } catch (err) {
        console.error('getYubiOrders fetch error:', err);
      }
    }
    return yubiOrdersCache;
  },

  async insertYubiOrder(order: any): Promise<boolean> {
    const newOrder = {
      ...order,
      id: order.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      orderedAt: order.orderedAt || new Date().toLocaleString('en-IN')
    };

    const exists = yubiOrdersCache.some((ord: any) => ord.id === newOrder.id);
    if (!exists) {
      yubiOrdersCache = [newOrder, ...yubiOrdersCache];
    } else {
      yubiOrdersCache = yubiOrdersCache.map((ord: any) => ord.id === newOrder.id ? newOrder : ord);
    }

    if (supabase) {
      try {
        const { error } = await supabase.from('yubikey_orders').insert([
          {
            id: newOrder.id,
            full_name: newOrder.fullName,
            phone: newOrder.phone,
            address: newOrder.address,
            quantity: newOrder.quantity,
            key_type: newOrder.keyType,
            ordered_at: new Date().toISOString()
          }
        ]);
        if (error) {
          console.error('insertYubiOrder database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('insertYubiOrder catch error:', err);
        return false;
      }
    }
    return true;
  },

  async deleteYubiOrder(id: string): Promise<boolean> {
    yubiOrdersCache = yubiOrdersCache.filter(ord => ord.id !== id);

    if (supabase) {
      try {
        const { error } = await supabase
          .from('yubikey_orders')
          .delete()
          .eq('id', id);
        if (error) {
          console.error('deleteYubiOrder database error:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('deleteYubiOrder catch error:', err);
        return false;
      }
    }
    return true;
  },

  // --- SEED DATABASE ---
  async seedDatabase(): Promise<{ success: boolean; message?: string; error?: string }> {
    if (!supabase) {
      return { success: false, error: 'Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.' };
    }

    try {
      const defaultEmps = [
        {
          employee_id: 'CAM20260618HUJ0',
          email: 'asd@mail.com',
          password: 'password123',
          full_name: 'jsjf sk',
          first_name: 'jsjf',
          last_name: 'sk',
          phone: '+91 123165456',
          address: 'kfs',
          education: 'Diploma',
          photo_url: '',
          signature_path: '',
          completed_at: new Date().toISOString()
        },
        {
          employee_id: 'JAN20020108SURVILX',
          email: 'aman.yadav@gmail.com',
          password: 'password123',
          full_name: 'Aman Yadav',
          first_name: 'Aman',
          last_name: 'Yadav',
          phone: '+91 9876543211',
          address: 'Delhi, India',
          education: 'Graduate',
          photo_url: '',
          signature_path: '',
          completed_at: new Date().toISOString()
        },
        {
          employee_id: 'FEB20020208SURVILX',
          email: 'rahul@mail.com',
          password: 'password123',
          full_name: 'Rahul Kumar',
          first_name: 'Rahul',
          last_name: 'Kumar',
          phone: '+91 8122334455',
          address: 'Central Operations Suite, Mumbai',
          education: '12th Pass',
          photo_url: '',
          signature_path: '',
          completed_at: new Date().toISOString()
        }
      ];

      const defaultIncidents = [
        {
          incident_id: 'INC-2948',
          location: 'Grocery Site B',
          camera: 'Aisle 07',
          time: '14:36:44',
          type: 'Product Concealment',
          status: 'pending',
          risk_score: 92,
          description: 'Skeletal track identified item passing from rack to jacket interior pocket.'
        },
        {
          incident_id: 'INC-8392',
          location: 'Warehouse Central',
          camera: 'South Fence Yard',
          time: '14:12:05',
          type: 'After-Hours Foot Intrusion',
          status: 'verified',
          risk_score: 84,
          description: 'Human outline identified crossing fence perimeter at 02:11am.'
        },
        {
          incident_id: 'INC-5511',
          location: 'Convenience Site C',
          camera: 'POS Counter 01',
          time: '13:58:33',
          type: 'Unattended Cash Tray',
          status: 'false_alarm',
          risk_score: 45,
          description: 'Drawer remained open after employee step-away, analyzed as housekeeping error.'
        }
      ];

      const defaultLeads = [
        {
          full_name: 'Rajesh Nair',
          company_name: 'SafeSec Logistics',
          business_type: 'Warehouse Management',
          number_of_locations: '5-10 Locations',
          phone: '+91 9911223344',
          email: 'rajesh@safeseclog.com',
          message: 'Interested in the smart after-hours intrusion monitoring system for our warehouse yards.'
        },
        {
          full_name: 'Anjali Sharma',
          company_name: 'HyperMart Stores',
          business_type: 'Retail Security',
          number_of_locations: '15+ Locations',
          phone: '+91 9898765432',
          email: 'anjali@hypermart.in',
          message: 'We want to pilot the AI Shoplifting prevention software on 5 select cameras.'
        }
      ];

      const defaultApplicants = [
        {
          id: 'APP-8391',
          full_name: 'Aarav Sharma',
          email: 'aarav.sharma@gmail.com',
          phone: '9876123450',
          address: 'Indiranagar, Bangalore, Karnataka',
          education: 'M.Tech Computer Science',
          role: 'Threat Detection Specialist',
          status: 'Applied'
        },
        {
          id: 'APP-2948',
          full_name: 'Priya Patel',
          email: 'priya.patel@outlook.com',
          phone: '8123004561',
          address: 'Andheri West, Mumbai, Maharashtra',
          education: 'B.E. Information Technology',
          role: 'FIDO Protocol Security Engineer',
          status: 'Applied'
        }
      ];

      const defaultOrders = [
        {
          id: 'ORD-9021',
          full_name: 'Amit Kumar',
          phone: '9876543210',
          address: 'Flat 304, Cyber Oasis, Sector 62, Noida, Uttar Pradesh - 201301',
          quantity: 2,
          key_type: 'YubiKey 5C (COD ₹4,000)'
        },
        {
          id: 'ORD-7742',
          full_name: 'Sneha Reddy',
          phone: '8123456789',
          address: 'Plot No. 45, Jubilee Hills, Road No. 10, Hyderabad, Telangana - 500033',
          quantity: 1,
          key_type: 'YubiKey 5C NFC (Promo ₹0)'
        }
      ];

      for (const emp of defaultEmps) {
        await supabase.from('employees').upsert([emp], { onConflict: 'employee_id' });
      }
      for (const inc of defaultIncidents) {
        await supabase.from('survilx_incidents').upsert([inc], { onConflict: 'incident_id' });
      }
      for (const lead of defaultLeads) {
        const { data: exist } = await supabase.from('survilx_contacts').select('id').eq('email', lead.email).limit(1);
        if (!exist || exist.length === 0) {
          await supabase.from('survilx_contacts').insert([lead]);
        }
      }
      for (const applicant of defaultApplicants) {
        await supabase.from('job_applicants').upsert([applicant], { onConflict: 'id' });
      }
      for (const order of defaultOrders) {
        await supabase.from('yubikey_orders').upsert([order], { onConflict: 'id' });
      }

      employeesCache = defaultEmps.map(emp => ({
        employeeId: emp.employee_id,
        email: emp.email,
        fullName: emp.full_name,
        firstName: emp.first_name,
        lastName: emp.last_name,
        phone: emp.phone,
        address: emp.address,
        education: emp.education,
        completedAt: '18 June 2026'
      }));

      return { 
        success: true, 
        message: 'Successfully seeded database with beautiful demo records! They are now visible instantly in your Supabase tables!' 
      };
    } catch (err: any) {
      console.error('Seeding database error:', err);
      return { success: false, error: err.message || 'Unknown database seeding error' };
    }
  }
};
