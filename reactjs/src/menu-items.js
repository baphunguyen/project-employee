import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import FilterVintageOutlinedIcon from '@mui/icons-material/FilterVintageOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import EditAttributesOutlinedIcon from '@mui/icons-material/EditAttributesOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const icons = {
    NavigationOutlinedIcon: NavigationOutlinedIcon,
    HomeOutlinedIcon: HomeOutlinedIcon,
    FormatUnderlinedOutlinedIcon: FormatUnderlinedOutlinedIcon,
    GamesOutlinedIcon: GamesOutlinedIcon,
    LoyaltyOutlinedIcon: LoyaltyOutlinedIcon,
    ForumOutlinedIcon: ForumOutlinedIcon,
    DescriptionOutlinedIcon: DescriptionOutlinedIcon,
    GridOnOutlinedIcon: GridOnOutlinedIcon,
    TableChartOutlinedIcon: TableChartOutlinedIcon,
    AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
    CallToActionOutlinedIcon: CallToActionOutlinedIcon,
    NotificationsNoneOutlinedIcon: NotificationsNoneOutlinedIcon,
    AppsOutlinedIcon: AppsOutlinedIcon,
    SmsOutlinedIcon: SmsOutlinedIcon,
    FilterVintageOutlinedIcon: FilterVintageOutlinedIcon,
    FormatColorTextOutlinedIcon: FormatColorTextOutlinedIcon,
    ContactSupportOutlinedIcon: ContactSupportOutlinedIcon,
    LayersOutlinedIcon: LayersOutlinedIcon,
    BlockOutlinedIcon: BlockOutlinedIcon,
    ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
    FiberManualRecordOutlinedIcon: FiberManualRecordOutlinedIcon,
    EditAttributesOutlinedIcon: EditAttributesOutlinedIcon,
    FaceOutlinedIcon: FaceOutlinedIcon,
    RadioButtonUncheckedOutlinedIcon: RadioButtonUncheckedOutlinedIcon,
    QuestionAnswerOutlinedIcon: QuestionAnswerOutlinedIcon,
    AccountCircleOutlinedIcon: AccountCircleOutlinedIcon,
    ShoppingCartOutlinedIcon: ShoppingCartOutlinedIcon,
    MailOutlineRoundedIcon: MailOutlineRoundedIcon,
    SpeakerNotesOutlinedIcon: SpeakerNotesOutlinedIcon,
    CardGiftcardOutlinedIcon: CardGiftcardOutlinedIcon,
    ErrorOutlineRoundedIcon: ErrorOutlineRoundedIcon,
    HourglassEmptyRoundedIcon: HourglassEmptyRoundedIcon,
    MonetizationOnOutlinedIcon: MonetizationOnOutlinedIcon,
    AssignmentIndOutlinedIcon: AssignmentIndOutlinedIcon,
    SecurityOutlinedIcon: SecurityOutlinedIcon,
    HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
    TranslateIcon: TranslateIcon,
    FormatListNumberedRtlIcon: FormatListNumberedRtlIcon,
    AddCircleOutlineOutlinedIcon: AddCircleOutlineOutlinedIcon
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
                    id: 'rtl',
                    title: 'Add Employee',
                    type: 'item',
                    icon: icons['AddCircleOutlineOutlinedIcon'],
                    url: '/register',
                    target: true,
                },
            ],
        },
    ],
};
