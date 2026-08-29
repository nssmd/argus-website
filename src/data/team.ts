export type TeamMember = {
  login: string;
  name: string | null;
  avatar: string;
  bio: string | null;
  email: string | null;
  website: string | null;
  company: string | null;
  location: string | null;
  profile: string;
  publicRepos: number;
  followers: number;
};

export const teamMembers: TeamMember[] = [
  {
    login: "aHappend",
    name: "Guo Sufeng",
    avatar: "https://avatars.githubusercontent.com/u/228031504?v=4",
    bio: "Undergraduate - Nanjing University · Integrated Circuit Design & Integrated Systems · Building autonomous AI systems and AI accelerators @Argus-AiTeam",
    email: "sufeng_guo@smail.nju.edu.cn",
    website: "https://linktr.ee/sufeng_guo",
    company: "Nanjing University",
    location: "Jiangsu, CHINA",
    profile: "https://github.com/aHappend",
    publicRepos: 11,
    followers: 5,
  },
  {
    login: "Chenxxxxxx06",
    name: "陈曦",
    avatar: "https://avatars.githubusercontent.com/u/169567975?v=4",
    bio: "学的明白么",
    email: "chenxxxxxx@mail.nwpu.edu.cn",
    website: null,
    company: "NPU",
    location: null,
    profile: "https://github.com/Chenxxxxxx06",
    publicRepos: 4,
    followers: 5,
  },
  {
    login: "lbx154",
    name: "River Li",
    avatar: "https://avatars.githubusercontent.com/u/145820328?v=4",
    bio: "lbxhaixing154@sjtu.edu.cn\nSJTU CS 2023-2027",
    email: "lbxhaixing154@sjtu.edu.cn",
    website: "https://argusbot.cn",
    company: null,
    location: null,
    profile: "https://github.com/lbx154",
    publicRepos: 23,
    followers: 23,
  },
  {
    login: "nssmd",
    name: "zimo",
    avatar: "https://avatars.githubusercontent.com/u/153410608?v=4",
    bio: null,
    email: null,
    website: null,
    company: null,
    location: null,
    profile: "https://github.com/nssmd",
    publicRepos: 39,
    followers: 31,
  },
  {
    login: "racoonykc",
    name: "杨凯程",
    avatar: "https://avatars.githubusercontent.com/u/157031612?v=4",
    bio: "SJTU majored in Automation",
    email: null,
    website: "https://www.sjtu.edu.cn",
    company: "ShangHai Jiao Tong University",
    location: "shanghai",
    profile: "https://github.com/racoonykc",
    publicRepos: 6,
    followers: 4,
  },
  {
    login: "Silentmoonlight",
    name: "Zhang Jiahan",
    avatar: "https://avatars.githubusercontent.com/u/114417959?v=4",
    bio: "undergraduate student of Shanghai Jiaotong University",
    email: null,
    website: null,
    company: "Shanghai Jiaotong University",
    location: null,
    profile: "https://github.com/Silentmoonlight",
    publicRepos: 1,
    followers: 0,
  },
  {
    login: "waltstephen",
    name: "Fan Yijia",
    avatar: "https://avatars.githubusercontent.com/u/144539759?v=4",
    bio: "SYSU major in computer science",
    email: null,
    website: "https://www.sysu.edu.cn/",
    company: "SUN YAT SEN UNIVERSITY",
    location: "Guangzhou China",
    profile: "https://github.com/waltstephen",
    publicRepos: 23,
    followers: 36,
  },
  {
    login: "zhxianlucky",
    name: null,
    avatar: "https://avatars.githubusercontent.com/u/96423976?v=4",
    bio: "Researcher @ Microsoft Research",
    email: null,
    website: "https://www.microsoft.com/en-us/research/people/zhxian/",
    company: null,
    location: null,
    profile: "https://github.com/zhxianlucky",
    publicRepos: 1,
    followers: 3,
  },
];
