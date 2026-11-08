import Home from './pages/Home';
import StoryGuide from './pages/StoryGuide';
import StoryGuideDetail from './pages/StoryGuideDetail';
import EasterEggs from './pages/EasterEggs';
import EasterEggDetail from './pages/EasterEggDetail';
import Wiki from './pages/Wiki';
import WikiDetail from './pages/WikiDetail';
import Cities from './pages/Cities';
import TierList from './pages/TierList';
import BeginnerGuide from './pages/BeginnerGuide';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import GiftCodes from './pages/GiftCodes';
import Modifications from './pages/Modifications';
import ModificationDetail from './pages/ModificationDetail';
import Builds from './pages/Builds';
import BuildDetail from './pages/BuildDetail';
import HomeDesigns from './pages/HomeDesigns';
import HomeDesignDetail from './pages/HomeDesignDetail';
import SearchPage from './pages/Search';
import AnnouncementDetail from './pages/AnnouncementDetail';
import Gallery from './pages/Gallery';
import About from './pages/About';
import NotFound from './pages/NotFound';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
  public?: boolean;
}

export const routes: RouteConfig[] = [
  { name: '首页', path: '/', element: <Home />, public: true },
  { name: '剧情攻略', path: '/story', element: <StoryGuide />, public: true },
  { name: '剧情攻略详情', path: '/story/:id', element: <StoryGuideDetail />, public: true },
  { name: '场景彩蛋', path: '/easter-eggs', element: <EasterEggs />, public: true },
  { name: '场景彩蛋详情', path: '/easter-eggs/:id', element: <EasterEggDetail />, public: true },
  { name: 'Wiki 首页', path: '/wiki', element: <Wiki />, public: true },
  { name: 'Wiki 详情', path: '/wiki/:category/:id', element: <WikiDetail />, public: true },
  { name: '城市信息', path: '/wiki/cities', element: <Cities />, public: true },
  { name: '强度榜', path: '/tier-list', element: <TierList />, public: true },
  { name: '新手攻略', path: '/beginner', element: <BeginnerGuide />, public: true },
  { name: '活动攻略', path: '/events', element: <Events />, public: true },
  { name: '活动攻略详情', path: '/events/:id', element: <EventDetail />, public: true },
  { name: '礼包码', path: '/gift-codes', element: <GiftCodes />, public: true },
  { name: '改装方案', path: '/modifications', element: <Modifications />, public: true },
  { name: '改装方案详情', path: '/modifications/:id', element: <ModificationDetail />, public: true },
  { name: '搭配方案', path: '/builds', element: <Builds />, public: true },
  { name: '搭配方案详情', path: '/builds/:id', element: <BuildDetail />, public: true },
  { name: '家园搭配方案', path: '/home-designs', element: <HomeDesigns />, public: true },
  { name: '家园搭配方案详情', path: '/home-designs/:id', element: <HomeDesignDetail />, public: true },
  { name: '搜索', path: '/search', element: <SearchPage />, public: true },
  { name: '上线公告', path: '/announcements/launch', element: <AnnouncementDetail />, public: true },
  { name: '图片中心', path: '/gallery', element: <Gallery />, public: true },
  { name: '关于我们', path: '/about', element: <About />, public: true },
  { name: '页面未找到', path: '*', element: <NotFound />, public: true },
];
