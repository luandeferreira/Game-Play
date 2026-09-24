import { ImageSourcePropType } from 'react-native';

export interface CategoryData {
  id: string;
  name: string;
  icon: ImageSourcePropType;
}

export interface MatchData {
  id: string;
  name: string;
  category: string;
  date: string;
  host: 'Anfitrião' | 'Visitante';
  icon: ImageSourcePropType;
}

export interface ServerData {
  id: string;
  name: string;
  role: string;
  icon: ImageSourcePropType;
}

export interface PlayerData {
  id: string;
  name: string;
  status: 'Disponível' | 'Ocupado';
  avatar: ImageSourcePropType;
}

export const CATEGORIES: CategoryData[] = [
  { id: '1', name: 'Ranqueada', icon: require('../../assets/ranqueada.png') },
  { id: '2', name: 'Duelo 1x1', icon: require('../../assets/duelo.png') },
  { id: '3', name: 'Diversão', icon: require('../../assets/diversao.png') },
];

export const MATCHES: MatchData[] = [
  {
    id: '1',
    name: 'Lendários',
    category: 'Ranqueada',
    date: '18/06 às 21:00h',
    host: 'Anfitrião',
    icon: require('../../assets/lol.png'),
  },
  {
    id: '2',
    name: 'Yeah, boy',
    category: 'Diversão',
    date: '23/06 às 19:00h',
    host: 'Visitante',
    icon: require('../../assets/reddead.png'),
  },
  {
    id: '3',
    name: 'Rumo ao topo',
    category: '1×1',
    date: '20/06 às 09:00h',
    host: 'Anfitrião',
    icon: require('../../assets/csgo.png'),
  },
  {
    id: '4',
    name: 'Bora queimar tudo',
    category: 'Ranqueada',
    date: '20/06 às 14:20h',
    host: 'Anfitrião',
    icon: require('../../assets/apex.png'),
  },
  {
    id: '5',
    name: 'Valorosos',
    category: 'Diversão',
    date: '10/06 às 21:00h',
    host: 'Anfitrião',
    icon: require('../../assets/valorant.png'),
  },
];

export const SERVERS: ServerData[] = [
  { id: '1', name: 'Rumo ao topo', role: 'Administrador', icon: require('../../assets/csgo.png') },
  { id: '2', name: 'Bora queimar tudo', role: 'Convidado', icon: require('../../assets/apex.png') },
  { id: '3', name: 'Yeah, Boy', role: 'Convidado', icon: require('../../assets/reddead.png') },
  { id: '4', name: 'Valorosos', role: 'Convidado', icon: require('../../assets/valorant.png') },
  { id: '5', name: 'Rolezão Monstro', role: 'Convidado', icon: require('../../assets/gta.png') },
  { id: '6', name: 'Construtores', role: 'Convidado', icon: require('../../assets/minecraft.png') },
  { id: '7', name: 'Battle Insane', role: 'Convidado', icon: require('../../assets/battlefield.png') },
  { id: '8', name: 'Lendários', role: 'Administrador', icon: require('../../assets/lol.png') },
];

export const PLAYERS: PlayerData[] = [
  { id: '1', name: 'Tiago Luchtenberg', status: 'Disponível', avatar: require('../../assets/tiagopic.png') },
  { id: '2', name: 'Rodrigo Gonçalves', status: 'Ocupado', avatar: require('../../assets/rodrigopic.png') },
  { id: '3', name: 'Diego Fernandes', status: 'Ocupado', avatar: require('../../assets/diegopic.png') },
];
