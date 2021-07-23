export const homeNavs = [
	{
		name: 'Iloilo.gov',
		url: 'https://www.iloilo.gov.ph',
		children: [],
	},
	{
		name: 'Home',
		route: '',
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
		children: [
			{
				name: 'Responsible Parenthood and Family Planning Program',
				route: '1',
			},
			{
				name: 'Adolscent Health & Youth Development Program',
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
		children: [
			{
				name: 'Responsible Parenthood and Family Planning Program',
				route: '1',
			},
			{
				name: 'Adolscent Health & Youth Development Program',
				route: '2',
			},
			{
				name: 'Population and Development Integration',
				route: '3',
			},
			{
				name: 'Population Data Managment',
				route: '4',
			},
		],
	},
	{
		name: 'Demographics',
		route: 'demographic/',
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
		children: [
			{
				name: 'Pre-Marriage Orrientation and Counseling',
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
		name: 'Others',
		children: [
			{
				name: 'File Uploads',
				route: '',
			},
		],
	},
]
