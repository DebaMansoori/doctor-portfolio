export const doctor = {
  name: 'Dr. Khalid Khan Zadran',
  shortName: 'Dr. Khalid Zadran',
  title: 'Consultant Neurosurgeon & Brain & Spine Specialist',
  clinic: 'Rifah Medical Complex',
  address: 'Rifah Medical Complex, Kabul, Afghanistan',
  city: 'Kabul, Afghanistan',
  phone: '+93 78 765 4751',
  phoneHref: 'tel:+93787654751',
  whatsappHref: 'https://wa.me/93787654751',
  email: 'contact@rifahmedical.example',
  emailHref: 'mailto:contact@rifahmedical.example',
  social: {
    facebook: { label: 'Facebook', href: 'https://facebook.com/' },
    instagram: { label: 'Instagram', href: 'https://instagram.com/' },
  },
}

export const workingHours = [
  { days: 'Saturday — Thursday', hours: '08:00 — 16:00' },
  { days: 'Emergency consultations', hours: 'On call' },
  { days: 'Friday', hours: 'Clinic closed' },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Appointment', to: '/appointment' },
  { label: 'Contact', to: '/contact' },
]

/*
 * Demo figures for layout only — replace with verified clinic data before going live.
 * The assignment brief forbids invented success claims, so these are clearly labelled.
 */
export const stats = [
  { value: '15+', label: 'Years Experience', note: 'Demo figure' },
  { value: '5,000+', label: 'Patients Treated', note: 'Demo figure' },
  { value: '98%', label: 'Patient Satisfaction', note: 'Demo figure' },
  { value: '4', label: 'Specialized Services', note: 'Verified service list' },
]

export const highlights = [
  {
    icon: 'users',
    title: 'Multidisciplinary clinic',
    text: 'Consultations run alongside imaging and physiotherapy teams at Rifah Medical Complex.',
  },
  {
    icon: 'shield',
    title: 'Second-opinion friendly',
    text: 'Scan reviews and second opinions are welcome before any treatment decision.',
  },
  {
    icon: 'clock',
    title: 'Structured follow-up',
    text: 'Every treatment plan includes a written follow-up and review schedule.',
  },
]

/*
 * Timeline entries are placeholders pending the doctor's verified CV.
 * Each item states what still needs confirming so nothing unverified reads as fact.
 */
export const education = [
  {
    period: 'Residency',
    title: 'Neurosurgical Residency Training',
    institution: 'To be confirmed with the doctor',
    text: 'Board-relevant neurosurgical training covering cranial, spine and intensive-care rotations.',
  },
  {
    period: 'Fellowship',
    title: 'Brain & Spine Surgery Fellowship',
    institution: 'To be confirmed with the doctor',
    text: 'Subspecialty exposure to complex spine reconstruction and vascular neurosurgery.',
  },
  {
    period: 'Faculty',
    title: 'Medical Faculty Degree',
    institution: 'To be confirmed with the doctor',
    text: 'Base medical degree and internship completed before surgical specialisation.',
  },
  {
    period: 'Current',
    title: 'Consultant Neurosurgeon',
    institution: 'Rifah Medical Complex, Kabul',
    text: 'Outpatient neurosurgical consultations, imaging review and treatment planning.',
  },
]

export const memberships = [
  {
    title: 'Afghan Medical Association',
    text: 'Professional body membership — details to be verified before publication.',
  },
  {
    title: 'Neurological Surgery Society',
    text: 'National or regional society membership — details to be verified.',
  },
  {
    title: 'Hospital privileging',
    text: 'Operating privileges at Rifah Medical Complex — confirmation pending.',
  },
]

