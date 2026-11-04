import { Activity, Brain, ScanLine, Stethoscope } from 'lucide-react'

export const services = [
  {
    id: 'brain-surgery-consultation',
    index: '01',
    tag: 'Brain',
    title: 'Brain Surgery Consultation',
    description:
      'Review of brain imaging and symptoms, discussion of diagnosis, and guidance on whether surgical or non-surgical management is appropriate.',
    icon: Brain,
    points: ['Scan and report review', 'Diagnosis discussion', 'Surgical candidacy review'],
  },
  {
    id: 'spine-surgery-consultation',
    index: '02',
    tag: 'Spine',
    title: 'Spine Surgery Consultation',
    description:
      'Assessment for back and neck pain, disc, canal and nerve-root problems, with a staged plan from conservative care to intervention.',
    icon: Activity,
    points: ['Pain and mobility assessment', 'Conservative-first plan', 'Intervention options'],
  },
  {
    id: 'nerve-disorder-assessment',
    index: '03',
    tag: 'Nerves',
    title: 'Nerve Disorder Assessment',
    description:
      'Evaluation of numbness, weakness, tingling and radiating pain, including referral for electrodiagnostic and imaging studies.',
    icon: ScanLine,
    points: ['Neurological examination', 'Reflex and strength testing', 'Test referral pathway'],
  },
  {
    id: 'neurosurgical-evaluation',
    index: '04',
    tag: 'Evaluation',
    title: 'Neurosurgical Evaluation',
    description:
      'A structured second-opinion evaluation that summarises findings, risks and next steps in a written plan you can take to any facility.',
    icon: Stethoscope,
    points: ['Full history taking', 'Written findings summary', 'Second-opinion ready'],
  },
]

export const processSteps = [
  {
    index: '01',
    tag: 'Step one',
    title: 'Consultation',
    description:
      'Share your symptoms and history in a calm, unhurried clinic appointment, in person or by phone.',
  },
  {
    index: '02',
    tag: 'Step two',
    title: 'Diagnosis',
    description:
      'Relevant imaging and neurological tests are reviewed and explained in plain language.',
  },
  {
    index: '03',
    tag: 'Step three',
    title: 'Treatment Plan',
    description:
      'You leave with a written plan: options, expected timeline, follow-up dates and warning signs.',
  },
]
