export interface TemplateDefinition {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  content: string;
  placeholders: string[];
}

export const AVAILABLE_TEMPLATES: TemplateDefinition[] = [
  {
    id: 0,
    title: "Non-Disclosure Agreement",
    description: "Protect confidential information shared between parties with a legally binding NDA.",
    icon: "🔒",
    category: "Confidentiality",
    content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of [DATE] between [PARTY_A_NAME], located at [PARTY_A_ADDRESS] ("Disclosing Party"), and [PARTY_B_NAME], located at [PARTY_B_ADDRESS] ("Receiving Party").

1. CONFIDENTIAL INFORMATION
The Receiving Party agrees to keep confidential all information disclosed by the Disclosing Party, including but not limited to business plans, technical data, trade secrets, and proprietary information.

2. OBLIGATIONS
The Receiving Party shall:
(a) Hold all Confidential Information in strict confidence;
(b) Not disclose Confidential Information to any third party without prior written consent;
(c) Use Confidential Information solely for the purpose of [PURPOSE].

3. TERM
This Agreement shall remain in effect for a period of [DURATION] from the date of execution.

4. GOVERNING LAW
This Agreement shall be governed by the laws of [GOVERNING_LAW_JURISDICTION].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

Disclosing Party: [PARTY_A_NAME]
Signature: _______________________
Date: [DATE]

Receiving Party: [PARTY_B_NAME]
Signature: _______________________
Date: [DATE]`,
    placeholders: ["DATE", "PARTY_A_NAME", "PARTY_A_ADDRESS", "PARTY_B_NAME", "PARTY_B_ADDRESS", "PURPOSE", "DURATION", "GOVERNING_LAW_JURISDICTION"],
  },
  {
    id: 1,
    title: "Service Agreement",
    description: "Define the terms of service between a provider and client for professional services.",
    icon: "📋",
    category: "Services",
    content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of [DATE] between [SERVICE_PROVIDER_NAME] ("Service Provider") and [CLIENT_NAME] ("Client").

1. SERVICES
Service Provider agrees to provide the following services to Client: [SERVICE_DESCRIPTION].

2. COMPENSATION
Client agrees to pay Service Provider [PAYMENT_AMOUNT] for the services rendered. Payment shall be due [PAYMENT_TERMS].

3. TERM
This Agreement shall commence on [START_DATE] and continue until [END_DATE], unless terminated earlier.

4. TERMINATION
Either party may terminate this Agreement with [NOTICE_PERIOD] written notice.

5. INDEPENDENT CONTRACTOR
Service Provider is an independent contractor and not an employee of Client.

6. GOVERNING LAW
This Agreement shall be governed by the laws of [GOVERNING_LAW_JURISDICTION].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

Service Provider: [SERVICE_PROVIDER_NAME]
Signature: _______________________
Date: [DATE]

Client: [CLIENT_NAME]
Signature: _______________________
Date: [DATE]`,
    placeholders: ["DATE", "SERVICE_PROVIDER_NAME", "CLIENT_NAME", "SERVICE_DESCRIPTION", "PAYMENT_AMOUNT", "PAYMENT_TERMS", "START_DATE", "END_DATE", "NOTICE_PERIOD", "GOVERNING_LAW_JURISDICTION"],
  },
  {
    id: 2,
    title: "Employment Contract",
    description: "Establish clear terms of employment including duties, compensation, and benefits.",
    icon: "👔",
    category: "Employment",
    content: `EMPLOYMENT CONTRACT

This Employment Contract ("Agreement") is entered into as of [DATE] between [EMPLOYER_NAME] ("Employer") and [EMPLOYEE_NAME] ("Employee").

1. POSITION
Employer hereby employs Employee in the position of [JOB_TITLE], commencing on [START_DATE].

2. COMPENSATION
Employee shall receive a salary of [SALARY] per [PAY_PERIOD], subject to applicable withholdings.

3. DUTIES
Employee shall perform the duties and responsibilities associated with the position of [JOB_TITLE] and such other duties as may be assigned by Employer.

4. BENEFITS
Employee shall be entitled to [BENEFITS_DESCRIPTION].

5. CONFIDENTIALITY
Employee agrees to maintain the confidentiality of all proprietary information of Employer.

6. TERMINATION
Either party may terminate this Agreement with [NOTICE_PERIOD] written notice.

7. GOVERNING LAW
This Agreement shall be governed by the laws of [GOVERNING_LAW_JURISDICTION].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

Employer: [EMPLOYER_NAME]
Signature: _______________________
Date: [DATE]

Employee: [EMPLOYEE_NAME]
Signature: _______________________
Date: [DATE]`,
    placeholders: ["DATE", "EMPLOYER_NAME", "EMPLOYEE_NAME", "JOB_TITLE", "START_DATE", "SALARY", "PAY_PERIOD", "BENEFITS_DESCRIPTION", "NOTICE_PERIOD", "GOVERNING_LAW_JURISDICTION"],
  },
  {
    id: 3,
    title: "Lease Agreement",
    description: "Create a comprehensive rental agreement for residential or commercial properties.",
    icon: "🏠",
    category: "Real Estate",
    content: `LEASE AGREEMENT

This Lease Agreement ("Agreement") is entered into as of [DATE] between [LANDLORD_NAME] ("Landlord") and [TENANT_NAME] ("Tenant").

1. PROPERTY
Landlord hereby leases to Tenant the property located at [PROPERTY_ADDRESS] ("Premises").

2. TERM
The lease term shall commence on [START_DATE] and end on [END_DATE].

3. RENT
Tenant agrees to pay monthly rent of [MONTHLY_RENT], due on the [RENT_DUE_DAY] of each month.

4. SECURITY DEPOSIT
Tenant shall pay a security deposit of [SECURITY_DEPOSIT] upon execution of this Agreement.

5. USE OF PREMISES
Tenant shall use the Premises solely for residential purposes and shall not sublet without Landlord's written consent.

6. MAINTENANCE
Tenant shall maintain the Premises in good condition and promptly notify Landlord of any needed repairs.

7. GOVERNING LAW
This Agreement shall be governed by the laws of [GOVERNING_LAW_JURISDICTION].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

Landlord: [LANDLORD_NAME]
Signature: _______________________
Date: [DATE]

Tenant: [TENANT_NAME]
Signature: _______________________
Date: [DATE]`,
    placeholders: ["DATE", "LANDLORD_NAME", "TENANT_NAME", "PROPERTY_ADDRESS", "START_DATE", "END_DATE", "MONTHLY_RENT", "RENT_DUE_DAY", "SECURITY_DEPOSIT", "GOVERNING_LAW_JURISDICTION"],
  },
  {
    id: 4,
    title: "Power of Attorney",
    description: "Grant legal authority to another person to act on your behalf in legal matters.",
    icon: "⚖️",
    category: "Legal Authority",
    content: `POWER OF ATTORNEY

I, [PRINCIPAL_NAME], residing at [PRINCIPAL_ADDRESS], hereby appoint [AGENT_NAME], residing at [AGENT_ADDRESS], as my Attorney-in-Fact ("Agent").

1. GRANT OF AUTHORITY
I grant my Agent full power and authority to act on my behalf in the following matters: [SCOPE_OF_AUTHORITY].

2. EFFECTIVE DATE
This Power of Attorney shall be effective as of [EFFECTIVE_DATE].

3. DURATION
This Power of Attorney shall remain in effect until [EXPIRATION_DATE] or until revoked in writing.

4. COMPENSATION
My Agent shall [COMPENSATION_TERMS] for services rendered under this Power of Attorney.

5. GOVERNING LAW
This Power of Attorney shall be governed by the laws of [GOVERNING_LAW_JURISDICTION].

IN WITNESS WHEREOF, I have executed this Power of Attorney on [DATE].

Principal: [PRINCIPAL_NAME]
Signature: _______________________
Date: [DATE]`,
    placeholders: ["PRINCIPAL_NAME", "PRINCIPAL_ADDRESS", "AGENT_NAME", "AGENT_ADDRESS", "SCOPE_OF_AUTHORITY", "EFFECTIVE_DATE", "EXPIRATION_DATE", "COMPENSATION_TERMS", "GOVERNING_LAW_JURISDICTION", "DATE"],
  },
  {
    id: 5,
    title: "Partnership Agreement",
    description: "Formalize a business partnership with defined roles, responsibilities, and profit sharing.",
    icon: "🤝",
    category: "Business",
    content: `PARTNERSHIP AGREEMENT

This Partnership Agreement ("Agreement") is entered into as of [DATE] between [PARTNER_1_NAME] and [PARTNER_2_NAME] (collectively "Partners").

1. BUSINESS NAME
The Partners agree to conduct business under the name [BUSINESS_NAME].

2. PURPOSE
The purpose of the partnership is [BUSINESS_PURPOSE].

3. CAPITAL CONTRIBUTIONS
Each Partner shall contribute the following capital:
- [PARTNER_1_NAME]: [PARTNER_1_CONTRIBUTION]
- [PARTNER_2_NAME]: [PARTNER_2_CONTRIBUTION]

4. PROFIT AND LOSS SHARING
Profits and losses shall be shared as follows:
- [PARTNER_1_NAME]: [PARTNER_1_SHARE]%
- [PARTNER_2_NAME]: [PARTNER_2_SHARE]%

5. MANAGEMENT
The day-to-day management of the business shall be handled by [MANAGING_PARTNER].

6. DISSOLUTION
The partnership may be dissolved upon mutual written agreement of all Partners.

7. GOVERNING LAW
This Agreement shall be governed by the laws of [GOVERNING_LAW_JURISDICTION].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

Partner 1: [PARTNER_1_NAME]
Signature: _______________________
Date: [DATE]

Partner 2: [PARTNER_2_NAME]
Signature: _______________________
Date: [DATE]`,
    placeholders: ["DATE", "PARTNER_1_NAME", "PARTNER_2_NAME", "BUSINESS_NAME", "BUSINESS_PURPOSE", "PARTNER_1_CONTRIBUTION", "PARTNER_2_CONTRIBUTION", "PARTNER_1_SHARE", "PARTNER_2_SHARE", "MANAGING_PARTNER", "GOVERNING_LAW_JURISDICTION"],
  },
];
