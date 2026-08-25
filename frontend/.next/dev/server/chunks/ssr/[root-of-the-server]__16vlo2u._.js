module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/src/context/AppContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const defaultProfile = {
    name: 'Ayaan',
    college: 'Example Institute of Technology',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    year: '2nd Year',
    interests: [
        'Artificial Intelligence',
        'Web Development',
        'Hackathons'
    ],
    skills: [
        'Python',
        'React',
        'Machine Learning'
    ],
    location: 'Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    distancePreference: 10,
    role: 'Student'
};
const defaultNotifications = [
    {
        id: 'notif-1',
        message: 'Your saved AI Hackathon 2026 closes in 2 days. Complete your registration!',
        timestamp: '2 hours ago',
        read: false,
        type: 'warning'
    },
    {
        id: 'notif-2',
        message: '3 new hackathons and internships match your interest in Web Development.',
        timestamp: '5 hours ago',
        read: false,
        type: 'info'
    },
    {
        id: 'notif-3',
        message: 'React Developers Meetup - NCR Edition is happening 3.2 km from your location this weekend.',
        timestamp: '1 day ago',
        read: true,
        type: 'info'
    },
    {
        id: 'notif-4',
        message: 'Registration successful for React Developers Meetup - NCR Edition.',
        timestamp: '1 day ago',
        read: true,
        type: 'success'
    }
];
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AppProvider({ children }) {
    const [role, setRoleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Student');
    const [userProfile, setUserProfileState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isOnboarded, setIsOnboardedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [opportunities, setOpportunities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [savedOpportunityIds, setSavedOpportunityIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        'opp-1',
        'opp-6'
    ]);
    const [registeredOpportunityIds, setRegisteredOpportunityIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        'opp-18'
    ]);
    const [completedOpportunityIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        'opp-3'
    ]);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load initial state on client mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    const setRole = (newRole)=>{
        setRoleState(newRole);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
    const setUserProfile = (profile)=>{
        setUserProfileState(profile);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
    const setIsOnboarded = (status)=>{
        setIsOnboardedState(status);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
    const syncOpportunities = (newOpps)=>{
        setOpportunities(newOpps);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
    const toggleSaveOpportunity = (id)=>{
        setSavedOpportunityIds((prev)=>{
            const isAlreadySaved = prev.includes(id);
            const updated = isAlreadySaved ? prev.filter((oId)=>oId !== id) : [
                ...prev,
                id
            ];
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return updated;
        });
    };
    const registerForOpportunity = (id)=>{
        setRegisteredOpportunityIds((prev)=>{
            if (prev.includes(id)) return prev;
            const updated = [
                ...prev,
                id
            ];
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Add success notification
            const matchedOpp = opportunities.find((o)=>o.id === id);
            const newNotif = {
                id: `notif-${Date.now()}`,
                message: `Successfully registered for ${matchedOpp ? matchedOpp.title : 'the opportunity'}!`,
                timestamp: 'Just now',
                read: false,
                type: 'success'
            };
            setNotifications((notifs)=>{
                const nextNotifs = [
                    newNotif,
                    ...notifs
                ];
                localStorage.setItem('localystic_notifications', JSON.stringify(nextNotifs));
                return nextNotifs;
            });
            return updated;
        });
    };
    const markNotificationRead = (id)=>{
        setNotifications((prev)=>{
            const updated = prev.map((n)=>n.id === id ? {
                    ...n,
                    read: true
                } : n);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return updated;
        });
    };
    const markAllNotificationsAsRead = ()=>{
        setNotifications((prev)=>{
            const updated = prev.map((n)=>({
                    ...n,
                    read: true
                }));
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return updated;
        });
    };
    const addOpportunity = (oppData)=>{
        const newId = `opp-host-${Date.now()}`;
        const newOpp = {
            ...oppData,
            id: newId,
            matchScore: Math.floor(Math.random() * 25) + 70,
            matchReasons: [
                `Matches your ${oppData.category.slice(0, -1)} preference`,
                `Located in ${oppData.city}`,
                'Fits standard student skillsets'
            ],
            status: 'Published'
        };
        const nextOpps = [
            newOpp,
            ...opportunities
        ];
        syncOpportunities(nextOpps);
        return newId;
    };
    const updateOpportunity = (id, updatedFields)=>{
        const nextOpps = opportunities.map((opp)=>opp.id === id ? {
                ...opp,
                ...updatedFields
            } : opp);
        syncOpportunities(nextOpps);
    };
    const deleteOpportunity = (id)=>{
        const nextOpps = opportunities.filter((opp)=>opp.id !== id);
        syncOpportunities(nextOpps);
    };
    const logout = ()=>{
        setUserProfileState(null);
        setIsOnboardedState(false);
        setRoleState('Student');
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            role,
            setRole,
            userProfile,
            setUserProfile,
            isOnboarded,
            setIsOnboarded,
            opportunities,
            setOpportunities,
            savedOpportunityIds,
            toggleSaveOpportunity,
            registeredOpportunityIds,
            registerForOpportunity,
            completedOpportunityIds,
            notifications,
            markNotificationRead,
            markAllNotificationsAsRead,
            addOpportunity,
            updateOpportunity,
            deleteOpportunity,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AppContext.tsx",
        lineNumber: 265,
        columnNumber: 5
    }, this);
}
function useApp() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__16vlo2u._.js.map