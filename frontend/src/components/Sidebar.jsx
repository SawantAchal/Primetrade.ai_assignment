import React from 'react';

const Sidebar = ({activeView, setActiveView, isSidebarOpen, closeSidebar}) => {

  return (
    <>
        {isSidebarOpen && (
            <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={closeSidebar} />
        )}
        <aside className={` fixed md:static top-16 left-0 z-50 w-64 h-[calc(100vh-4rem)] bg-white shadow-sm transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 `}>
            <div className="p-4 space-y-3">
                <button className={`w-full cursor-pointer text-left px-3 py-2 rounded ${ activeView === 'add' ? 'bg-blue-100' : '' }`} onClick={() => { setActiveView('add'); closeSidebar(); }}>
                    Add Note
                </button>
                <button className={`w-full cursor-pointer text-left px-3 py-2 rounded ${ activeView === 'view' ? 'bg-blue-100' : '' }`} onClick={() => { setActiveView('view'); closeSidebar(); }}>
                    View Notes
                </button>
            </div>
        </aside>
    </>
  );
};

export default Sidebar;
