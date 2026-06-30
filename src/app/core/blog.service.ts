import { Injectable, signal } from '@angular/core';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'hashtags'; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  author: string;
  tags: string[];
  readMinutes: number;
  body: BlogBlock[];
}

const POSTS: BlogPost[] = [
  {
    slug: 'saving-a-life-in-5-minutes',
    title: 'Saving a Life in 5 Minutes: A Reminder That Kindness Can Change the World',
    date: '2025-04-23',
    excerpt:
      'Yesterday, our belief was brought to life when we crossed paths with a cow in desperate need.',
    cover: '/img/blog/cow-saved.JPG',
    author: 'Betterplace Team',
    tags: ['Animal Welfare', 'Story'],
    readMinutes: 3,
    body: [
      { type: 'p', text: 'At Betterplace, we carry a simple belief in our hearts — that a little compassion can change the world.' },
      { type: 'p', text: 'Yesterday, this belief was brought to life once again when we crossed paths with a cow in desperate need. She was alone, weak, and struggling under the sun. It was clear she hadn\'t had food or water for a long time. She needed help — and she needed it fast.' },
      { type: 'p', text: 'Without a second thought, our team jumped into action. We gently approached her, offered her clean water, and fed her some nourishing food. We could see the relief in her eyes as she slowly sipped the water — a simple, pure moment that said more than words ever could.' },
      { type: 'p', text: 'But we knew this was just the beginning. Her condition needed proper medical attention. So, we immediately contacted a trusted rescue team to get her the help she needed. Thanks to their quick response, she was soon on her way to a hospital where veterinarians could care for her properly.' },
      { type: 'p', text: 'Today, we\'re happy to share that she is safe, healing, and on her way to a better life.' },
      { type: 'p', text: 'The whole act — from noticing her to ensuring she was in safe hands — took barely five minutes. Just five minutes. Yet, those five minutes meant the difference between life and death.' },
      { type: 'p', text: 'This moment reminded us — and we hope it reminds you too — that kindness doesn\'t always require grand efforts or endless resources. Sometimes, it just requires presence, compassion, and the willingness to act.' },
      { type: 'p', text: 'In a world that often feels overwhelming, it\'s easy to believe that one small action can\'t make a difference. But the truth is — small acts create big change. Every time we choose empathy over indifference, every time we step forward instead of walking away, we make this world a little brighter, a little better.' },
      { type: 'p', text: 'At Betterplace, we\'re committed to choosing kindness — not just in big moments, but in every moment we can.' },
      { type: 'quote', text: 'You don\'t have to be a superhero to save a life. You just have to care.' },
      { type: 'p', text: 'Let\'s keep building a world where compassion isn\'t rare, but a way of life. Let\'s make a better place — together.' },
      { type: 'hashtags', text: '#Betterplace #EveryLifeMatters #KindnessMatters #ActOfCompassion' }
    ]
  },
  {
    slug: 'planting-dreams-four-year-journey',
    title: 'Planting Dreams: Our Four-Year Journey Towards a Greener, Kinder World',
    date: '2024-08-15',
    excerpt:
      'Four years ago, we made a simple promise: to give back to the Earth that gives us everything.',
    cover: '/img/blog/tree-planation.jpg',
    author: 'Anirudh Atrish',
    tags: ['Plantation', 'Climate'],
    readMinutes: 5,
    body: [
      { type: 'p', text: 'At Betterplace, we believe that real change is planted in small, humble beginnings — a handful of seeds, a patch of soil, a moment of care.' },
      { type: 'p', text: 'Four years ago, we made a simple promise: to give back to the Earth that gives us everything. We started planting trees — not as a grand project or for applause, but from a deep, personal calling to heal the world around us. To leave behind a planet greener, kinder, and more alive than the one we were born into.' },
      { type: 'p', text: 'Today, as we look back, we see not just thousands of trees standing tall, but thousands of dreams taking root.' },
      { type: 'h', text: 'More Than Just Trees' },
      { type: 'p', text: 'Every sapling we\'ve planted holds a story:' },
      { type: 'ul', items: [
        'A story of hope, nurtured with muddy hands and tender hearts.',
        'A story of communities coming together, neighbors becoming friends, strangers becoming family under the shade of a common cause.',
        'A story of resilience, where even the smallest sapling stands bravely against storms and droughts, whispering, "I will grow."'
      ] },
      { type: 'p', text: 'With every tree, we are not just planting wood and leaves — we are planting oxygen, shelter, memories, and promises. A promise that when the next generation walks these paths, they will breathe easier, dream bigger, and live better.' },
      { type: 'h', text: 'Acts of Kindness That Root Deep' },
      { type: 'p', text: 'Kindness is a seed. When we choose to care for something other than ourselves — a sapling, a bird, a stranger — we set powerful forces in motion.' },
      { type: 'p', text: 'Over the past four years:' },
      { type: 'ul', items: [
        'We have seen children clapping joyfully as they plant their first tree.',
        'We have watched volunteers wipe sweat from their brows but smile wider than ever.',
        'We have heard the quiet "thank you" from farmers and elders who know that a planted tree is a planted future.'
      ] },
      { type: 'p', text: 'Every tree we have planted is an act of faith — faith in humanity\'s ability to repair, not just destroy; to nurture, not just take.' },
      { type: 'h', text: 'Why We Keep Going' },
      { type: 'p', text: 'The road hasn\'t always been easy. Some saplings didn\'t survive the harsh summers. Some sites were difficult to reach. Sometimes, the scale of what needed to be done felt overwhelming.' },
      { type: 'p', text: 'But we kept going — and we will keep going. Because we know that real change, just like real trees, takes time. It demands patience. It asks us to believe when the results aren\'t immediate, to trust the process, and to love without conditions.' },
      { type: 'p', text: 'In a world that often rushes for quick rewards, we choose the slow, sacred work of growing.' },
      { type: 'h', text: 'Join Us: Plant a Seed, Plant a Future' },
      { type: 'p', text: 'Our journey is far from over. In fact, it is just beginning.' },
      { type: 'p', text: 'We invite you — yes, you reading this — to be a part of this movement. You don\'t need acres of land or special tools. You only need two things: love for this Earth and a willingness to act.' },
      { type: 'p', text: 'Plant a tree. Protect one. Speak for the ones that can\'t. Because every tree you plant is a gift to a future you might never see — and that is the purest form of kindness.' },
      { type: 'p', text: 'Together, let\'s build a world where forests thrive, rivers flow cleaner, skies stay bluer, and every child grows up knowing what it feels like to run beneath a canopy of leaves.' },
      { type: 'quote', text: 'Together, let\'s make the world a Betterplace.' },
      { type: 'hashtags', text: '#Betterplace #PlantHope #GreenerTomorrow #KindnessMatters #RootsOfChange' }
    ]
  },
  {
    slug: 'feeding-the-forgotten',
    title: 'Feeding the Forgotten: Our Compassionate Commitment to Animals in Need',
    date: '2025-03-02',
    excerpt:
      'One such moment happened recently when we came across a cow in desperate need.',
    cover: '/img/blog/cows-eating.jpeg',
    author: 'Betterplace Team',
    tags: ['Animal Welfare', 'Community'],
    readMinutes: 4,
    body: [
      { type: 'p', text: 'At Betterplace, we believe that kindness and compassion extend to all beings, whether human or animal. Each day brings new opportunities to make a difference, and sometimes, it\'s the smallest acts of care that make the biggest impact.' },
      { type: 'p', text: 'One such moment happened recently when we came across a cow in desperate need. Weak, malnourished, and in urgent need of nourishment, this gentle creature reminded us that the world can sometimes forget the silent, voiceless beings who share it with us.' },
      { type: 'p', text: 'Without hesitation, our team sprang into action. It wasn\'t a grand rescue, nor a moment of fanfare — it was simply about showing up for another life in need. And in that moment, we were reminded once again why compassion should know no boundaries.' },
      { type: 'h', text: 'A Simple Act of Feeding, A Life Restored' },
      { type: 'p', text: 'We\'ve always known that care can be simple — a hand reaching out, a bowl of food, a sip of water. But it\'s these seemingly small gestures that make all the difference in the world.' },
      { type: 'p', text: 'When we saw the cow in distress, we first offered her water, letting her drink deeply and soothingly. We then carefully provided her with some nourishing food, knowing that food and hydration are the first steps toward restoring her strength.' },
      { type: 'p', text: 'It wasn\'t long before the gentle cow began to show signs of relief. The calmness in her eyes, the subtle change in her demeanor, and the way she began to stand tall again reminded us of the incredible healing power of love and care.' },
      { type: 'h', text: 'Caring for All Beings' },
      { type: 'p', text: 'For us, this act wasn\'t an isolated incident. It is part of a bigger mission. A mission to not only protect our planet through environmental work, but also to extend our hands to the animals who share this world with us.' },
      { type: 'p', text: 'Feeding cows, whether they are strays or living in difficult conditions, is part of the work we do every day. It\'s about offering them the compassion they deserve and understanding that all life is connected. Just as we care for the plants and trees we nurture, we must also care for the animals who depend on us.' },
      { type: 'p', text: 'The cow we fed may have been just one animal, but her story is a reminder that we must never underestimate the power of small, kind actions. Every life matters.' },
      { type: 'h', text: 'The Importance of Being There for Animals' },
      { type: 'p', text: 'Our journey of helping cows is just one part of our broader mission to extend kindness and compassion to all creatures. For animals in need, it\'s often the simplest acts — providing food, water, shelter, and medical attention — that make the most lasting difference.' },
      { type: 'p', text: 'Every time we offer care, we remind ourselves and others that animals, like humans, deserve respect, kindness, and protection. Whether it\'s through feeding, rescuing, or ensuring their safety, our role as stewards of the Earth calls us to protect those who are vulnerable.' },
      { type: 'h', text: 'How You Can Help Too' },
      { type: 'p', text: 'Caring for animals doesn\'t always require grand resources — it just requires a willingness to step in when help is needed. Whether it\'s offering food to a stray animal, reporting an injured animal to authorities, or donating to organizations dedicated to animal welfare, every small action helps.' },
      { type: 'p', text: 'We invite you to join us in this important work. When we look out for the welfare of animals, we\'re not only saving lives — we\'re also spreading a message of empathy and kindness that can ripple through communities.' },
      { type: 'p', text: 'Together, we can help feed and protect those who need it most. Together, we can build a more compassionate world for all beings.' },
      { type: 'hashtags', text: '#Betterplace #CompassionInAction #EveryLifeMatters #KindnessForAnimals #AnimalWelfare' }
    ]
  },
  {
    slug: 'sacred-duty-soldier-and-natures-fallen',
    title: 'A Sacred Duty: The Silent Bond Between a Soldier and Nature\'s Fallen',
    date: '2025-05-10',
    excerpt:
      'A personal reflection on dignity in death — and the quiet ritual of burying fallen birds.',
    cover: '/img/blog/dead-bird.JPG',
    author: 'Anirudh Atrish',
    tags: ['Reflection', 'Nature'],
    readMinutes: 4,
    body: [
      { type: 'p', text: 'I come from a Defence family background where I have seen my father serving the Nation every day — a world where honor, duty, and service are not just words but a way of life. In the military, performing the last rites of a fallen comrade is considered the highest act of respect. The solemnity, the folded flag, the final salute — these moments are etched deep into the soul. They teach us that in death, as in life, dignity is sacred.' },
      { type: 'p', text: 'Hi, my name is Anirudh Atrish. I am trying to create an impact on this world to make it a better place with my NGO Betterplace. Today, I want to share a unique experience that changed the way I view all life.' },
      { type: 'h', text: 'The First Burial: A Sparrow\'s Silent Lesson' },
      { type: 'p', text: 'It began with a sparrow. I found its fragile body on a morning walk, lying still on the pavement. Most would step over it. But something in me stopped. I knelt, cupped it in my hands, and felt the weightlessness of a life gone.' },
      { type: 'p', text: 'That evening, I dug a small grave under a neem tree in my garden. Wrapped it in cloth. Whispered a prayer. Covered it with earth. It was a simple act, but deeply meaningful.' },
      { type: 'quote', text: 'That night, I dreamt of wings.' },
      { type: 'h', text: 'The Cosmos Whispers, the Birds Listen' },
      { type: 'p', text: 'Soon, more birds came — sparrows, pigeons, a parakeet. They appeared near me, in their final moments. I started to believe the universe had woven a thread between us.' },
      { type: 'p', text: 'Each bird received the same ritual: gentle hands, a grave, a blessing. Coincidence? Maybe. But something sacred was unfolding.' },
      { type: 'h', text: 'The Little Dove and the Bougainvillea Blessing' },
      { type: 'p', text: 'One winter morning, I found a white dove on my balcony — still, at peace. I buried it under the bougainvillea tree and covered the grave in petals. A gust of wind showered me in flowers.' },
      { type: 'quote', text: 'That summer, the bougainvillea bloomed brighter than ever.' },
      { type: 'h', text: 'Why This Matters More Than We Realize' },
      { type: 'p', text: 'In a world that sweeps the dead aside, these acts are radical. Animals feel. They mourn. Science tells us elephants grieve. Crows hold funerals. Shouldn\'t we offer them the same dignity?' },
      { type: 'h', text: 'A Ripple of Compassion' },
      { type: 'p', text: 'This practice has changed me. It\'s deepened my respect for life in all forms. One time, after burying a pigeon, a flock circled above as if in thanks. Another time, a neighbor asked, "Why bother?" I said —' },
      { type: 'quote', text: 'Because no life should leave this world unmourned.' },
      { type: 'h', text: 'A Call to Kindness' },
      { type: 'p', text: 'If this story moves you, pause next time you see a fallen creature. Offer a moment of silence. Bury it, if you can. You may not hear thanks, but the universe remembers.' },
      { type: 'quote', text: 'And sometimes, when a bird sings or the wind whispers, it feels like the Earth says: "Thank you for caring."' },
      { type: 'p', text: 'Would you ever stop for a fallen bird? Let\'s spread this ripple of kindness — one tiny grave at a time.' },
      { type: 'hashtags', text: '#Compassion #KindnessMatters #HonorAllLife #SoldierForNature' }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class BlogService {
  posts = signal<BlogPost[]>(POSTS);
  get(slug: string) {
    return this.posts().find((p) => p.slug === slug) ?? null;
  }
}
