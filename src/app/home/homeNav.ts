export const homeNavs = [
    {
        name: 'Iloilo.gov',
        url: 'https://www.iloilo.gov.ph',
        children: [],
    },
    {
        name: 'Home',
        route: '',
        id: 'news',
        children: [
            {
                name: 'News',
                route: 'news',
            },
        ],
    },
    {
        name: 'About',
        route: 'about/',
        id: 'about',
        children: [
            {
                name: 'PPO Mandate',
                route: 'ppo-mandate',
            },
            {
                name: 'Mission, Vision & Goals',
                route: 'mission-values-and-goals',
            },
            {
                name: 'Core Values',
                route: 'core-values',
            },
            {
                name: 'Organizational Structure',
                route: 'organizational-structure',
            },
            {
                name: 'Personnel Directory',
                route: 'personnel-directory',
            },
            {
                name: 'Awards',
                route: 'awards',
            },
        ],
    },
    {
        name: 'Population ',
        route: '',
        id: 'population',
        children: [
            {
                name: 'Population Data',
                route: 'population',
            },
        ],
    },
    {
        name: 'Programs',
        route: 'programs/',
        id: 'programs',
        children: [
            {
                name: 'Responsible Parenthood and Family Planning Program',
                route: '1',
            },
            {
                name: 'Adolescent Health & Youth Development Program',
                route: '2',
            },
            {
                name: 'Comprehensive Population Data Banking and Management Project',
                route: '3',
            },
            {
                name: 'Population and Development Integration',
                route: '4',
            },
        ],
    },
    {
        name: 'Services',
        route: 'services/',
        id: 'services',
        children: [
            {
                name: 'Responsible Parenthood and Family Planning Program',
                route: '1',
            },
            {
                name: 'Adolescent Health & Youth Development Program',
                route: '2',
            },
            {
                name: 'Population and Development Integration',
                route: '3',
            },
            {
                name: 'Population Data Management',
                route: '4',
            },
        ],
    },
    {
        name: 'Demographics',
        route: 'demographic/',
        id: 'demographic',
        children: [
            {
                name: 'Births',
                route: 'births',
            },
            {
                name: 'Deaths',
                route: 'deaths',
            },
            {
                name: 'Migrations',
                route: 'migrations',
            },
            {
                name: 'Marriages',
                route: 'marriages',
            },
        ],
    },
    {
        name: 'RPFP',
        route: 'rpfp/',
        id: 'rpfp',
        children: [
            {
                name: 'Pre-Marriage Orientation and Counseling',
                route: 'pmoc',
            },
            {
                name: 'Multi-purpose Counseling and Family Development Center',
                route: 'mpcfdc',
            },
        ],
    },
    {
        name: 'AHYD',
        route: 'ahyd/',
        id: 'ahyd',
        children: [
            {
                name: 'Teen Centers',
                route: 'teen-centers',
            },
            {
                name: 'Issues & Concerns',
                route: 'issues-and-concerns',
            },
        ],
    },
    {
        route: 'others',
        id: 'others',
        name: 'Others',
        children: [
            {
                name: 'Key Files',
                route: '',
            },
        ],
    },
]
