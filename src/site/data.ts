export type FeatureIcon = 'spark' | 'layers' | 'cube';

export interface Feature {
  id: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  icon: FeatureIcon;
  accent: string;
}

export interface Work {
  id: string;
  title: string;
  category: 'Artistic' | 'AI' | '3D';
  blurb: string;
  description: string;
  gradient: string;
  tags: string[];
}

export type WorkFilter = 'All' | 'Artistic' | 'AI' | '3D';

export interface Plan {
  id: string;
  name: string;
  blurb: string;
  monthly: number;
  annual: number;
  cta: string;
  popular?: boolean;
  features: string[];
}

export const navItems = [
  { id: 'home', label: 'Overview' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'pricing', label: 'Pricing' },
];

export const features: Feature[] = [
  {
    id: 'processing',
    title: 'Processing',
    short: 'High-end processing functions that bring floral beauty to form.',
    description:
      'A GPU-accelerated pipeline that turns rough captures into gallery-grade botanical imagery. Tone, depth and texture are resolved in one pass, so what you see in the viewport is what you export.',
    bullets: [
      'Physically based petal and leaf shading',
      'One-click look development with LUT stacks',
      'Non-destructive edit history across every render',
    ],
    icon: 'spark',
    accent: 'rgba(79,227,168,0.32)',
  },
  {
    id: 'archive',
    title: 'Growth Archive',
    short: 'Set-up templates and choices for different plant varieties.',
    description:
      'Every species you work with becomes a reusable preset: growth curves, palette, material response and camera language are stored together, ready to drop into the next project.',
    bullets: [
      '120+ curated species templates',
      'Versioned presets that stay in sync across a team',
      'Import and export as portable JSON',
    ],
    icon: 'layers',
    accent: 'rgba(255,159,252,0.26)',
  },
  {
    id: 'sculpting',
    title: 'Advanced Plant Sculpting',
    short: 'Modern 3D crafting assets that permit you to build very complex and lifelike forms.',
    description:
      'Sculpt branching structures, foliage density and surface detail with a toolkit built for organic geometry. The result stays lightweight enough for real-time previews and clean enough for print.',
    bullets: [
      'Procedural branching with art-directable controls',
      'Real-time displacement preview at full resolution',
      'Export to glTF, USD and editable vector silhouettes',
    ],
    icon: 'cube',
    accent: 'rgba(180,151,207,0.3)',
  },
];

export const works: Work[] = [
  {
    id: 'lumen',
    title: 'Lumen Bloom',
    category: 'Artistic',
    blurb: 'A study of light passing through translucent petals.',
    description:
      'Lumen Bloom explores how much structure a flower can lose before it stops reading as a flower. The series was rendered entirely in-engine, with a single warm key light and a cool rim.',
    gradient: 'linear-gradient(135deg, #0c3d2b 0%, #1f8f66 46%, #9bf6cf 100%)',
    tags: ['Art direction', 'Look development', 'Editorial'],
  },
  {
    id: 'orbital',
    title: 'Orbital Garden',
    category: '3D',
    blurb: 'Botanical forms drifting in a low-gravity terrarium.',
    description:
      'A speculative habitat where roots grow toward a artificial sun. Built with procedural branching and a custom shader that fakes subsurface scattering without the cost.',
    gradient: 'linear-gradient(135deg, #2b1608 0%, #8a5a2b 48%, #f3c98b 100%)',
    tags: ['3D', 'Procedural', 'Motion'],
  },
  {
    id: 'synthetic',
    title: 'Synthetic Petals',
    category: 'AI',
    blurb: 'Generated hybrids trained on pressed-flower archives.',
    description:
      'A model fine-tuned on a private herbarium archive, then pushed deliberately off-distribution. Every frame is a real render; the model only proposes form, never pixels.',
    gradient: 'linear-gradient(135deg, #22103d 0%, #7b3fd4 48%, #ff9ffc 100%)',
    tags: ['AI', 'Hybrid', 'Archive'],
  },
  {
    id: 'terra',
    title: 'Terra Form 01',
    category: '3D',
    blurb: 'A single fern rebuilt as a walkable architecture.',
    description:
      'Terra Form scales a fern to the size of a building and treats every frond as a structural member. The piece was used as a set for a launch film and exported as a real-time scene.',
    gradient: 'linear-gradient(135deg, #08222e 0%, #1f6f8f 48%, #8fe6ff 100%)',
    tags: ['Environment', 'Real-time', 'Film'],
  },
  {
    id: 'halo',
    title: 'Halo Study',
    category: 'Artistic',
    blurb: 'Rings of pollen caught in a single long exposure.',
    description:
      'A camera study rather than a render: real pollen, real optics, composited with a procedurally generated halo. The grain is intentional and preserved at full resolution.',
    gradient: 'linear-gradient(135deg, #0d2a17 0%, #4e9b3f 48%, #d8ff9b 100%)',
    tags: ['Photography', 'Composite', 'Print'],
  },
  {
    id: 'night',
    title: 'Night Pollen',
    category: 'AI',
    blurb: 'Bioluminescent spores mapped onto a slow orbit.',
    description:
      'An ambient loop for a museum installation. Spore density is driven by audio amplitude, and the whole scene runs at a fixed 30 fps to stay within the venue hardware budget.',
    gradient: 'linear-gradient(135deg, #120a2e 0%, #4b2a9e 48%, #7cf0d0 100%)',
    tags: ['Installation', 'Audio reactive', 'Loop'],
  },
];

export const plans: Plan[] = [
  {
    id: 'seed',
    name: 'Seed',
    blurb: 'For a first study, a side project, or a quick exploration.',
    monthly: 0,
    annual: 0,
    cta: 'Start free',
    features: [
      '1 active project',
      '3 collaborators',
      '720p still and motion export',
      'Community support',
    ],
  },
  {
    id: 'bloom',
    name: 'Bloom',
    blurb: 'For designers shipping client work every week.',
    monthly: 24,
    annual: 19,
    cta: 'Choose Bloom',
    popular: true,
    features: [
      'Unlimited projects',
      '10 collaborators',
      'Priority render queue',
      '4K still and motion export',
      'Shared brand and material kits',
    ],
  },
  {
    id: 'studio',
    name: 'Studio',
    blurb: 'For teams that need governance, SSO and a real SLA.',
    monthly: 79,
    annual: 63,
    cta: 'Talk to us',
    features: [
      'Everything in Bloom',
      'Unlimited collaborators',
      'SSO and audit log',
      'Custom species and shader models',
      'Dedicated support with 99.9% SLA',
    ],
  },
];
