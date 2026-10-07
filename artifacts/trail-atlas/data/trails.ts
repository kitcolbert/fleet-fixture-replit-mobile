import type { ImageSourcePropType } from 'react-native';

export type TrailDifficulty = 'Easy' | 'Moderate' | 'Hard';

export type Trail = {
  id: string;
  name: string;
  region: string;
  distance: string;
  elevation: string;
  duration: string;
  difficulty: TrailDifficulty;
  routeType: string;
  bestSeason: string;
  terrain: string;
  description: string;
  highlights: string[];
  image: ImageSourcePropType;
};

export const trails: Trail[] = [
  {
    id: 'glasswing-ridge',
    name: 'Glasswing Ridge',
    region: 'Northwind Range',
    distance: '5.8 mi',
    elevation: '1,250 ft',
    duration: '3 hr 20 min',
    difficulty: 'Moderate',
    routeType: 'Out & back',
    bestSeason: 'June – October',
    terrain: 'Open meadow, rocky ridgeline',
    description:
      'A steady climb opens onto a long, airy ridge with wide views over Cloudmere Valley. In early summer, tiny blue flowers gather in the sheltered folds below the crest.',
    highlights: ['Cloudmere Valley views', 'Bluebell basin', 'Wind-carved ridge'],
    image: require('../assets/images/alpine.jpg'),
  },
  {
    id: 'tarnlight-loop',
    name: 'Tarnlight Loop',
    region: 'Northwind Range',
    distance: '3.4 mi',
    elevation: '420 ft',
    duration: '1 hr 45 min',
    difficulty: 'Easy',
    routeType: 'Loop',
    bestSeason: 'May – September',
    terrain: 'Pine path, lakeside boardwalk',
    description:
      'An easy wander through fragrant pines leads to a quiet, mirror-still tarn. Take the longer way around the water for a shady place to sit and watch the light change.',
    highlights: ['Stillwater Tarn', 'Shaded picnic spots', 'Gentle forest path'],
    image: require('../assets/images/alpine.jpg'),
  },
  {
    id: 'cedar-veil',
    name: 'Cedar Veil Path',
    region: 'Mossfall Forest',
    distance: '4.2 mi',
    elevation: '610 ft',
    duration: '2 hr 25 min',
    difficulty: 'Easy',
    routeType: 'Loop',
    bestSeason: 'April – November',
    terrain: 'Old-growth forest, soft earth',
    description:
      'A fern-lined path winds beneath towering cedars and along the clear, unhurried Mossrun. This gentle loop is made for slow mornings and frequent stops.',
    highlights: ['Mossrun footbridge', 'Fern-filled glades', 'Ancient cedar grove'],
    image: require('../assets/images/forest.jpg'),
  },
  {
    id: 'fern-hollow-traverse',
    name: 'Fern Hollow Traverse',
    region: 'Mossfall Forest',
    distance: '6.4 mi',
    elevation: '980 ft',
    duration: '3 hr 50 min',
    difficulty: 'Moderate',
    routeType: 'Point to point',
    bestSeason: 'May – October',
    terrain: 'Forest trail, rolling hills',
    description:
      'Follow the forest edge from Fern Hollow to the old lookout clearing. The route rises and falls through damp green gullies before the trees part for a view across Mossfall.',
    highlights: ['Lookout clearing', 'Mossy ravines', 'Seasonal wildflowers'],
    image: require('../assets/images/forest.jpg'),
  },
  {
    id: 'emberline-overlook',
    name: 'Emberline Overlook',
    region: 'Sunspoke Canyon',
    distance: '5.2 mi',
    elevation: '1,450 ft',
    duration: '3 hr 30 min',
    difficulty: 'Moderate',
    routeType: 'Out & back',
    bestSeason: 'October – April',
    terrain: 'Sandstone ledges, desert wash',
    description:
      'Climb from a quiet wash to the warm sandstone rim, where Sunspoke Canyon opens into a patchwork of mesas. The last mile is exposed, with little shade.',
    highlights: ['Sunspoke Canyon rim', 'Layered sandstone', 'Evening alpenglow'],
    image: require('../assets/images/canyon.jpg'),
  },
  {
    id: 'redstone-stair',
    name: 'Whistler’s Stair',
    region: 'Redstone Basin',
    distance: '7.1 mi',
    elevation: '2,100 ft',
    duration: '5 hr 10 min',
    difficulty: 'Hard',
    routeType: 'Out & back',
    bestSeason: 'June – September',
    terrain: 'Steep scree, exposed ridge',
    description:
      'A demanding climb follows a chain of red-rock shelves to a narrow basin high above the treeline. The final stretch is steep and exposed; take your time on the descent.',
    highlights: ['High basin viewpoint', 'Redstone shelves', 'Alpine wind-sculpted pines'],
    image: require('../assets/images/canyon.jpg'),
  },
];

export function findTrail(id: string | undefined) {
  return trails.find((trail) => trail.id === id);
}
