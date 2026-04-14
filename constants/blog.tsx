import dynamic from 'next/dynamic';
import path from 'path';
const TsStudy = dynamic(() => import('../app/blogs/ts-study/page'))

export const BLOG_CONFIG = [
  {
    id: 'ts-study',
    title: 'TS学习指南',
    type: 'local',
    path: '/blogs/ts-study',
    component: <TsStudy />,
  },
  {
    id: 'guide',
    title: '高级交互指南',
    type: 'remote',
    path: '/blogs/guide',
    component: <div>guideguideguide</div> ,
  },
  {
    id: 'guide1',
    title: '组合',
    type: 'local',
    path: '/blogs/guide1',
    children: [
      {
        id: 'guide1-1',
        title: '组合1',
        path: '/blogs/guide1-1',
        type: 'local',
      },
      {
        id: 'guide1-2',
        title: '组合2',
        path: '/blogs/guide1-2',
        type: 'local',
      },
    ],
  }
];