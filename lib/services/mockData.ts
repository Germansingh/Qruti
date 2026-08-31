import { LegalDocument, MockUser } from '../types/document';

export const DEMO_USER: MockUser = {
  id: 'demo-user-1',
  name: 'Alex Taylor',
  email: 'alex.taylor@example.com',
  role: 'Tenant / Employee / Independent Contractor',
};

export const SEED_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-lease-2026',
    ownerId: 'demo-user-1',
    title: 'Residential Tenancy Agreement (Apartment 4B)',
    fileName: 'Residential_Tenancy_Agreement_2026.pdf',
    fileType: 'pdf',
    fileSizeFormatted: '2.4 MB',
    fileSizeBytes: 2516582,
    uploadDate: '2026-08-20T10:15:00Z',
    status: 'processed',
    processingProgress: 100,
    category: 'Real Estate / Lease',
    analysis: {
      summary: {
        executiveSummary:
          'Standard fixed-term residential lease for Apartment 4B for a 12-month period. Contains automatic renewal provisions, strict maintenance responsibilities for tenant, and a 60-day written notice requirement prior to moving out.',
        keyTakeaways: [
          'Rent is $2,250/month payable on the 1st with a 5% late fee after the 5th.',
          'Requires 60 days advance notice to prevent automatic 1-year renewal.',
          'Tenant is responsible for minor repairs under $150.',
          'No subletting without landlord’s prior written approval.',
        ],
        contractType: 'Residential Lease Agreement',
        governingJurisdiction: 'State of California',
        totalEstimatedRiskScore: 'Moderate',
      },
      keyClauses: [
        {
          id: 'clause-1',
          clauseNumber: 'Section 4.2',
          title: 'Automatic Lease Renewal',
          originalText:
            'This Agreement shall automatically renew for a successive 12-month term unless either party provides written notice of non-renewal at least sixty (60) days prior to the expiration of the Initial Term.',
          simplifiedExplanation:
            'If you do not send a written cancellation notice 60 days before the lease ends, your lease automatically extends for another full year.',
          category: 'Termination',
          riskLevel: 'high',
          tags: ['Auto-Renewal', 'Notice Required'],
        },
        {
          id: 'clause-2',
          clauseNumber: 'Section 7.1',
          title: 'Tenant Maintenance Threshold',
          originalText:
            'Tenant shall be responsible for routine maintenance and minor repairs costing $150 or less per incident, including plumbing clogs and minor appliance troubleshooting.',
          simplifiedExplanation:
            'You have to pay for small repairs up to $150 out of your own pocket before the landlord steps in.',
          category: 'General',
          riskLevel: 'medium',
          tags: ['Tenant Cost', 'Repairs'],
        },
        {
          id: 'clause-3',
          clauseNumber: 'Section 12.3',
          title: 'Late Payment & Default Interest',
          originalText:
            'Rent payments received after 11:59 PM on the 5th calendar day of the month shall incur a late charge of 5% of the monthly installment plus $25 per day thereafter.',
          simplifiedExplanation:
            'If your rent payment arrives after the 5th, you are charged 5% extra plus $25 for every day it remains unpaid.',
          category: 'Payment',
          riskLevel: 'high',
          tags: ['Late Fee', 'Penalty'],
        },
        {
          id: 'clause-4',
          clauseNumber: 'Section 15.0',
          title: 'Subletting & Guest Policy',
          originalText:
            'Tenant shall not assign, sublet, or allow guests to reside on the Premises for more than fourteen (14) consecutive days without Landlord’s prior written consent.',
          simplifiedExplanation:
            'Guests cannot stay longer than 2 weeks straight, and you cannot sublease your room without express written permission.',
          category: 'General',
          riskLevel: 'low',
          tags: ['Subletting', 'Guests'],
        },
      ],
      risks: [
        {
          id: 'risk-1',
          title: 'Lock-in via 60-Day Auto-Renewal Clause',
          severity: 'high',
          category: 'Termination Risk',
          description:
            'Failure to calendar the 60-day notice mark will trap you into a brand new 12-month commitment with financial penalties for early termination.',
          clauseReference: 'Section 4.2',
          recommendedAction:
            'Set a calendar reminder for 75 days before lease end date to decide whether to extend or send written notice.',
        },
        {
          id: 'risk-2',
          title: 'Uncapped Per-Day Late Penalty',
          severity: 'medium',
          category: 'Financial Risk',
          description:
            'A 5% base fee plus $25/day accumulates rapidly if bank transfers are delayed or disputed.',
          clauseReference: 'Section 12.3',
          recommendedAction:
            'Set up automated bank payments to trigger 3 days before the 1st of each month.',
        },
        {
          id: 'risk-3',
          title: 'OutOf-Pocket Maintenance Burden',
          severity: 'low',
          category: 'Operational Risk',
          description:
            'Multiple small fixes under $150 can stack up over time during the tenancy.',
          clauseReference: 'Section 7.1',
          recommendedAction:
            'Document pre-existing damage during move-in walkthrough with photos.',
        },
      ],
      obligations: [
        {
          id: 'ob-1',
          party: 'user',
          title: 'Monthly Rent Payment',
          description: 'Pay $2,250 on or before the 1st of every calendar month.',
          frequency: 'Monthly',
          consequenceOfBreach: '5% late fee + possible 3-day notice to pay or quit.',
        },
        {
          id: 'ob-2',
          party: 'user',
          title: 'Renter’s Insurance Maintenance',
          description: 'Maintain minimum $100,000 personal liability coverage throughout the lease.',
          frequency: 'Annual',
          consequenceOfBreach: '$50 monthly penalty added to rent.',
        },
        {
          id: 'ob-3',
          party: 'counterparty',
          title: 'Habitual Utilities & Essential Services',
          description: 'Landlord provides water, sewer, and structural building maintenance.',
          frequency: 'Monthly',
        },
      ],
      importantDates: [
        {
          id: 'date-1',
          title: 'Monthly Rent Due Date',
          date: 'Every 1st of the month',
          eventType: 'Payment Due',
          actionRequired: 'Submit $2,250 rent payment.',
        },
        {
          id: 'date-2',
          title: 'Non-Renewal Written Notice Deadline',
          date: '2027-06-30',
          eventType: 'Notice Period',
          actionRequired: 'Deliver formal written notice if planning to move out by August 31, 2027.',
          isDaysCounted: true,
          daysRemaining: 307,
        },
        {
          id: 'date-3',
          title: 'Lease Agreement Expiration Date',
          date: '2027-08-31',
          eventType: 'Expiration',
          actionRequired: 'Hand over keys or start auto-renewed term.',
        },
      ],
      rawTextPreview: `RESIDENTIAL TENANCY AGREEMENT

THIS AGREEMENT made this 20th day of August, 2026, by and between Horizon Property Holdings ("Landlord") and Alex Taylor ("Tenant").

1. PREMISES: Landlord leases to Tenant Apartment 4B, 1200 Pacific Ave.
2. TERM: The term of this agreement shall commence on September 1, 2026 and terminate on August 31, 2027.
3. RENT: Tenant agrees to pay $2,250.00 per month on the 1st of each calendar month.
4. RENEWAL: This Agreement shall automatically renew for a successive 12-month term unless either party provides written notice of non-renewal at least sixty (60) days prior to expiration.
... [Full Text Extracted]`,
    },
  },
  {
    id: 'doc-emp-2026',
    ownerId: 'demo-user-1',
    title: 'Senior Software Engineer Employment Agreement',
    fileName: 'Senior_Developer_Employment_Contract.pdf',
    fileType: 'pdf',
    fileSizeFormatted: '1.8 MB',
    fileSizeBytes: 1887436,
    uploadDate: '2026-08-18T14:30:00Z',
    status: 'processed',
    processingProgress: 100,
    category: 'Employment',
    analysis: {
      summary: {
        executiveSummary:
          'Full-time employment contract for Senior Software Engineer position with $145,000 annual base salary. Includes 1-year non-compete clause, comprehensive IP assignment, and 14 days paid time off.',
        keyTakeaways: [
          'Base Salary: $145,000/yr paid bi-weekly with eligible annual performance bonus.',
          'Contains a strict 12-month post-employment non-compete clause within a 50-mile radius.',
          'All intellectual property created during employment belongs exclusively to the employer.',
          'At-will employment structure with 2 weeks notice recommended for resignations.',
        ],
        contractType: 'Employment Contract',
        governingJurisdiction: 'State of Texas',
        totalEstimatedRiskScore: 'High',
      },
      keyClauses: [
        {
          id: 'emp-clause-1',
          clauseNumber: 'Section 8.1',
          title: 'Post-Employment Non-Compete Restriction',
          originalText:
            'For a period of twelve (12) months following termination of employment, Employee agrees not to directly or indirectly engage in, manage, operate, or provide services to any business operating in direct competition with Employer within a 50-mile radius.',
          simplifiedExplanation:
            'If you quit or get laid off, you cannot work for a direct competitor in the same region for 1 whole year.',
          category: 'Termination',
          riskLevel: 'high',
          tags: ['Non-Compete', 'Career Risk'],
        },
        {
          id: 'emp-clause-2',
          clauseNumber: 'Section 5.3',
          title: 'Invention Assignment & IP Ownership',
          originalText:
            'Employee agrees that all inventions, code, designs, and intellectual property developed during the term of employment, whether during working hours or using company resources, are works made for hire and belong solely to Company.',
          simplifiedExplanation:
            'Any app, code, or patentable idea you create while employed here belongs 100% to the company.',
          category: 'IP',
          riskLevel: 'medium',
          tags: ['IP Ownership', 'Side Projects'],
        },
      ],
      risks: [
        {
          id: 'emp-risk-1',
          title: 'Broad Non-Compete May Limit Future Employment',
          severity: 'high',
          category: 'Career Mobility Risk',
          description:
            'The 12-month non-compete clause restricts taking local developer roles in the same domain if you leave.',
          clauseReference: 'Section 8.1',
          recommendedAction:
            'Negotiate to limit non-compete strictly to primary named competitors or reduce duration to 6 months.',
        },
        {
          id: 'emp-risk-2',
          title: 'Blanket IP Assignment Covers Personal Time Projects',
          severity: 'medium',
          category: 'Intellectual Property Risk',
          description:
            'Vague phrasing could allow the company to claim rights over personal open-source contributions.',
          clauseReference: 'Section 5.3',
          recommendedAction:
            'Add an explicit written schedule of pre-existing side projects to exclude from assignment.',
        },
      ],
      obligations: [
        {
          id: 'emp-ob-1',
          party: 'user',
          title: 'Confidentiality & Non-Disclosure',
          description: 'Protect trade secrets and proprietary code during and after employment.',
          frequency: 'One-time',
        },
        {
          id: 'emp-ob-2',
          party: 'counterparty',
          title: 'Bi-Weekly Compensation & Benefits',
          description: 'Provide bi-weekly base salary payments and health coverage.',
          frequency: 'Monthly',
        },
      ],
      importantDates: [
        {
          id: 'emp-date-1',
          title: 'Employment Start Date',
          date: '2026-09-15',
          eventType: 'Review',
          actionRequired: 'Complete onboarding paperwork and submit tax forms.',
          isDaysCounted: true,
          daysRemaining: 19,
        },
      ],
      rawTextPreview: `EMPLOYMENT AGREEMENT
... [Extracted Text for Senior Developer Contract]`,
    },
  },
  {
    id: 'doc-nda-2026',
    ownerId: 'demo-user-1',
    title: 'Mutual Non-Disclosure & Confidentiality Agreement',
    fileName: 'Mutual_NDA_Vendor_2026.png',
    fileType: 'png',
    fileSizeFormatted: '850 KB',
    fileSizeBytes: 870400,
    uploadDate: '2026-08-25T09:00:00Z',
    status: 'processed',
    processingProgress: 100,
    category: 'Confidentiality',
    analysis: {
      summary: {
        executiveSummary:
          'Mutual NDA governing confidential discussions regarding product development and strategic vendor evaluation. Standard 3-year confidentiality obligation.',
        keyTakeaways: [
          'Mutual protection of proprietary software ideas and financial metrics.',
          'Confidentiality period lasts for 3 years from disclosure date.',
          'Standard exclusions for publicly known or independently developed information.',
        ],
        contractType: 'Mutual Non-Disclosure Agreement',
        governingJurisdiction: 'State of Delaware',
        totalEstimatedRiskScore: 'Low',
      },
      keyClauses: [
        {
          id: 'nda-clause-1',
          clauseNumber: 'Section 3',
          title: 'Standard of Care & Obligation of Secrecy',
          originalText:
            'Each Receiving Party shall protect Confidential Information using the same degree of care it uses for its own confidential info of like nature, but no less than reasonable care.',
          simplifiedExplanation:
            'Both sides must take reasonable precautions not to leak or share each other’s secret info.',
          category: 'Privacy',
          riskLevel: 'low',
          tags: ['Confidentiality'],
        },
      ],
      risks: [
        {
          id: 'nda-risk-1',
          title: 'Long 3-Year Post-Disclosure Window',
          severity: 'low',
          category: 'Compliance Risk',
          description:
            'You must keep records of shared notes to ensure no accidental disclosures occur over the 3-year term.',
          clauseReference: 'Section 4',
          recommendedAction:
            'Store shared confidential attachments in a dedicated secure folder with restricted access.',
        },
      ],
      obligations: [
        {
          id: 'nda-ob-1',
          party: 'user',
          title: 'Prompt Notice of Subpoena',
          description: 'Notify disclosing party immediately if legally forced to disclose information.',
          frequency: 'On Trigger',
        },
      ],
      importantDates: [
        {
          id: 'nda-date-1',
          title: 'Agreement Expiration Date',
          date: '2029-08-25',
          eventType: 'Expiration',
          actionRequired: 'Confidentiality obligations conclude.',
        },
      ],
      rawTextPreview: `MUTUAL NON-DISCLOSURE AGREEMENT (OCR EXTRACTED FROM PNG)...`,
    },
  },
];
