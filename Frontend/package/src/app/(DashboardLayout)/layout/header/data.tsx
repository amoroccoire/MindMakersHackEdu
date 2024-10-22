
import img1 from 'src/assets/images/profile/user-1.jpg';
import icon1 from 'src/assets/images/svgs/icon-account.svg'
import ddIcon1 from 'src/assets/images/svgs/icon-dd-chat.svg'
//
// Notifications dropdown
//
const notifications = [
  {
    avatar: img1,
    title: 'EXAMPLE TAREA',
    subtitle: 'Tarea de Computacion',
  },
];

//
// Profile dropdown
//
const profile = [
  {
    href: '/user-profile',
    title: 'My Profile',
    subtitle: 'Account Settings',
    icon: icon1,
  },

];

// apps dropdown

const appsLink = [
  {
    href: '/apps/chats',
    title: 'Chat Application',
    subtext: 'Messages & Emails',
    avatar: ddIcon1
  },
]

const pageLinks = [
  {
    href: '/pricing',
    title: 'Pricing Page'
  },

]

export { notifications, profile, pageLinks, appsLink };
