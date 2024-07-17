// useRoutes.ts
import { useMemo, useState } from "react";
import { HiHome, HiSearch, HiBookmark, HiUserAdd, HiShare, HiCog, } from "react-icons/hi";
import { FaSun, FaMoon } from "react-icons/fa";
import { logout } from "../../redux/reducers/auth";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";

const useRoutes = () => {
    // const { conversationId } = useConversation();
    const dispatch = useDispatch();
    const [activeTab, setActivetab] = useState('home');
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

    const handleToggleAddFriendModal = () => {
        setActivetab('addFriend');
        setIsAddFriendModalOpen(!isAddFriendModalOpen);
    };

    const routes = useMemo(
        () => [
            {
                label: "Home",
                href: "/home",
                icon: HiHome,
                active: activeTab === "home",
                onClick: () => setActivetab('home'),

            },
            {
                label: "Search",
                href: "/search",
                icon: HiSearch,
                active: activeTab === "search",
                onClick: () => setActivetab('search'),

            },
            {
                label: "Saved",
                href: "/saved",
                icon: HiBookmark,
                active: activeTab === "saved",
                onClick: () => setActivetab('saved'),
            },
            {
                label: "Add",
                href: "/addFriend",
                icon: HiUserAdd,
                active: activeTab === "addFriend",
                onClick: () => setActivetab('addFriend'),
            },
            {
                label: "Share",
                href: "/share",
                icon: HiShare,
                active: activeTab === "share",
                onClick: () => setActivetab('share'),
            },
            {
                label: "Settings",
                href: "/settings",
                icon: HiCog,
                active: activeTab === "settings",
                onClick: () => setActivetab('settings'),
            },
            {
                label: "Dark Mode",
                href: "/dark-mode",
                icon: darkMode ? FaSun : FaMoon,
                onClick: toggleDarkMode,
                active: activeTab === "dark-mode",
            },
            {
                label: "Logout",
                href: "/logout",
                icon: CiLogout,
                onClick: () => dispatch(logout()),
                active: activeTab === "logout",
            },
        ],
        [
            activeTab,
            darkMode,
            // conversationId,
            isAddFriendModalOpen]
    );

    return { routes, isAddFriendModalOpen, handleToggleAddFriendModal, activeTabLink: activeTab, setActiveTabLink: setActivetab };
};

export default useRoutes;
