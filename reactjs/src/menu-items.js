import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';

const icons = {
    NavigationOutlinedIcon: NavigationOutlinedIcon,
    HomeOutlinedIcon: HomeOutlinedIcon,
    AddCircleOutlineOutlinedIcon: AddCircleOutlineOutlinedIcon,
    MenuIcon: MenuIcon
};

export default {
    items: [
        {
            id: 'navigation',
            title: 'Project Employee',
            caption: 'Dashboard',
            type: 'group',
            icon: icons['NavigationOutlinedIcon'],
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    icon: icons['HomeOutlinedIcon'],
                    url: '/dashboard',
                },
                {
                    id: 'register',
                    title: 'Add Employee',
                    type: 'item',
                    icon: icons['AddCircleOutlineOutlinedIcon'],
                    url: '/register',
                },
                {
                    id: 'parent menu',
                    title: 'Menu',
                    type: 'collapse',
                    icon: icons['MenuIcon'],
                    children: [
                        {
                            id: 'children1',
                            title: 'Children 1',
                            type: 'collapse',
                            children: [
                                {
                                    id: 'children1.1',
                                    title: 'Children 1.1',
                                    type: 'item',
                                    url: '#'
                                },
                                {
                                    id: 'children1.2',
                                    title: 'Children 1.2',
                                    type: 'item',
                                    url: '#'
                                },
                                {
                                    id: 'children1.3',
                                    title: 'Children 1.3',
                                    type: 'item',
                                    url: '#'
                                }
                            ]
                        },
                        {
                            id: 'children2',
                            title: 'Children 2',
                            type: 'item',
                            url: '#',
                        },
                        {
                            id: 'children3',
                            title: 'Children 3',
                            type: 'item',
                            url: '#',
                        },
                    ],
                }
            ],
        },
    ],
};
