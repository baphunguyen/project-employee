import {createTheme} from "@mui/material/styles";
import grey from '@mui/material/colors/grey';

export function theme(customization) {
    let textPrimary;
    let textSecondary;
    let textDark;
    let textHint;
    let background;
    let paper;
    let menuCaption;
    let textInversePrimary;
    switch (customization.navType) {
        case 'dark':
            textPrimary = menuCaption = textInversePrimary = '#bbc0c7';
            textSecondary = '#babfc9';
            textDark = '#fff';
            textHint = 'rgba(148, 145, 145, 0.3803921569)';

            background = '#181e2b';
            paper = '#232b38';
            break;
        case 'light':
        default:
            textPrimary = textInversePrimary = menuCaption = '#242c3a';
            textSecondary = '#1b212c';
            textDark = '#12171e';
            textHint = 'rgba(0, 0, 0, 0.3803921569)';

            background = '#f0f2f8';
            paper = '#ffffff';
            break;
    }

    return createTheme({
        direction: customization.rtlLayout ? 'rtl' : 'ltr',
        palette: {
            type: 'light',
            common: {
                black: '#232b38',
            },
            primary: {
                light: '#3380f4',
                main: '#3366ff',
                dark: '#0043a9',
                100: '#4c6fff',
            },
            secondary: {
                light: '#60696d',
                main: '#425466',
                dark: '#272f33',
            },
            error: {
                light: '#ec4333',
                main: '#ff413a',
                dark: '#a20e00',
            },
            warning: {
                light: '#f6b333',
                main: '#f4a100',
                dark: '#aa7000',
            },
            info: {
                light: '#33d8dd',
                main: '#00cfd5',
                dark: '#009095',
            },
            success: {
                light: '#33bc87',
                main: '#00ac69',
                dark: '#007849',
            },
            grey: {
                300: '#425466',
                // 400: value.grey400,
            },
            bg: {
                100: '#f8f8f9',
            },
            textDark: {
                color: textDark,
            },
            text: {
                primary: textPrimary,
                secondary: textSecondary,
                dark: textDark,
                hint: textHint,
            },
            background: {
                paper: paper,
                default: background,
            },
        },
        typography: {
            fontFamily: `'Poppins', sans-serif`,
            h6: {
                fontWeight: 600,
                color: textSecondary,
                fontSize: '0.875rem',
            },
            h5: {
                fontSize: '1.125rem',
                color: textSecondary,
                fontWeight: 600,
            },
            h4: {
                fontSize: '1.25rem',
                color: textSecondary,
                fontWeight: 500,
            },
            h3: {
                fontSize: '1.5rem',
                color: textDark,
                fontWeight: 600,
            },
            h2: {
                fontSize: '2rem',
                color: textDark,
                fontWeight: 600,
            },
            h1: {
                fontSize: '2.2rem',
                color: textDark,
                fontWeight: 600,
            },
            subtitle1: {
                fontSize: '0.875rem',
                fontWeight: 500,
                color: textSecondary,
                lineHeight: '1.643em',
            },
            subtitle2: {
                fontSize: '0.8125rem',
                fontWeight: 400,
            },
            caption: {
                fontSize: '0.68rem',
                color: textHint,
                fontWeight: 500,
            },
            body1: {
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: '1.643em',
            },
            body2: {
                letterSpacing: '0em',
                fontWeight: 400,
                lineHeight: '1.643em',
            },
            menuCaption: {
                fontSize: '0.6875rem !important',
                fontWeight: '600 !important',
                color: '#3366ff',
                padding: '5px 15px 5px',
                textTransform: 'uppercase',
                marginTop: '10px !important',
            },
            subMenuCaption: {
                fontSize: '0.6875rem !important',
                fontWeight: '400 !important',
                color: menuCaption,
                textTransform: 'capitalize',
            },
            subHeading: {
                color: 'red',
            },
            cardTitle: {
                color: '#3366ff',
                fontSize: '1rem',
            },
            breadcrumbTitle: {
                fontWeight: 500,
                fontSize: '1.5rem',
                color: textDark,
            },
        },
        overrides: {
            MuiAccordion: {
                root: {
                    boxShadow: 'none',
                },
            },
            MuiAccordionSummary: {
                root: {
                    fontWeight: 600,
                    fontSize: '0.875rem',
                },
                content: {
                    color: textSecondary,
                    fontWeight: 500,
                },
            },
            MuiPaper: {
                elevation1: {
                    boxShadow: '0 4px 6px -2px rgb(0 0 0 / 12%), 0 2px 2px -1px rgb(0 0 0 / 5%)',
                },
                rounded: {
                    borderRadius: '10px',
                },
            },
            MuiCard: {
                root: {
                    // border:'1px solid rgba(33, 40, 50, 0.125)'
                },
            },
            MuiCardHeader: {
                root: {
                    color: textDark,
                    padding: '24px',
                    //backgroundColor: headerBackColor,
                },
            },
            MuiCardContent: {
                root: {
                    padding: '24px',
                },
            },
            MuiCardActions: {
                root: {
                    padding: '24px',
                },
            },
            MuiSvgIcon: {
                root: {
                    fontSize: '1.3rem',
                },
            },
            // Table
            MuiTableCell: {
                root: {
                    padding: '16px 36px 16px 36px',
                    whiteSpace: 'nowrap',
                },
                head: {
                    padding: '16px 36px 16px 36px',
                    color: textDark,
                    fontWeight: 600,
                },
                paddingCheckbox: {
                    paddingLeft: '36px',
                    position: 'relative',
                },
            },
            MuiList: {
                root: {
                    overflow: 'hidden',
                },
            },
            MuiListItem: {
                root: {
                    color: textInversePrimary,
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    '&$selected': {
                        color: customization.navType === 'dark' ? '#e3f2fd' : '#3366ff',
                        backgroundColor: customization.navType !== 'dark' ? '#e3f2fd' : '#3366ff',
                        '&:hover': {
                            backgroundColor: customization.navType !== 'dark' ? '#e3f2fd' : '#3366ff',
                        },
                        '& .MuiListItemIcon-root': {
                            color: customization.navType === 'dark' ? '#e3f2fd' : '#3366ff',
                        },
                    },
                    '&:hover': {
                        color: customization.navType === 'dark' ? '#e3f2fd' : '#3366ff',
                        '& .MuiListItemIcon-root': {
                            color: customization.navType === 'dark' ? '#e3f2fd' : '#3366ff',
                        },
                    },
                },
                button: {
                    '&:hover': {
                        backgroundColor: customization.navType !== 'dark' ? '#e3f2fd' : '#3366ff',
                    },
                },
            },
            MuiListItemIcon: {
                root: {
                    minWidth: '36px',
                    color: textInversePrimary,
                },
            },
            MUIDataTableSelectCell: {
                fixedLeft: {
                    position: 'relative',
                },
            },
            MuiTableHead: {
                root: {
                    background: background,
                    //background: '#fbfdfe'
                },
            },
            MuiChip: {
                colorSecondary: {
                    color: grey[100],
                },
                colorPrimary: {
                    color: grey[100],
                },
                root: {
                    color: grey[100],
                },
                outlined: {
                    color: grey[500],
                },
            },
            MuiTimelineDot: {
                defaultGrey: {
                    background: grey[300],
                },
            },
            MuiTimelineConnector: {
                root: {
                    background: grey[300],
                },
            },
            MuiTableContainer: {
                root: {
                    boxShadow: 'none',
                },
            },
            MuiAvatar: {
                colorDefault: {
                    backgroundColor: 'rgba(0, 0, 0, 0.3803921569)',
                    color: grey[100],
                },
            },
            MuiInputBase: {
                input: {
                    color: textDark,
                },
            },
        },
    });
}

export default theme;
