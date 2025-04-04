document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('#menu > li > a');
    const submenuItems = document.querySelectorAll('.submenu > li > a');

    // 点击汉堡菜单按钮时，切换菜单的显示状态
    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 自动清理所有菜单项
    const clearAllMenus = () => {
        document.querySelectorAll('.submenu, .submenu-level2').forEach(submenu => submenu.style.display = 'none');
        document.querySelectorAll('.show').forEach(item => item.classList.remove('show'));
        
        // ✅ 移除所有二级菜单的激活样式
        menuItems.forEach(link => link.classList.remove('active'));
    };

    // 点击页面的任意区域关闭菜单
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
            clearAllMenus();
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // 二级菜单的展开与关闭逻辑
    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.stopPropagation();
            const parentLi = this.parentElement;

            if (parentLi.querySelector('.submenu')) {
                event.preventDefault();

                const submenu = parentLi.querySelector('.submenu');

                // 关闭所有其他二级菜单
                document.querySelectorAll('.submenu').forEach(sub => {
                    if (sub !== submenu) sub.style.display = 'none';
                });

                document.querySelectorAll('#menu > li').forEach(li => {
                    if (li !== parentLi) li.classList.remove('show');
                });

                // ✅ 移除所有二级菜单的激活样式
                menuItems.forEach(link => link.classList.remove('active'));

                // ✅ 添加激活样式到当前点击的二级菜单
                this.classList.add('active');

                // 切换当前点击的菜单项
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                parentLi.classList.toggle('show');
            }
        });
    });

    // 三级菜单的展开与关闭逻辑
    submenuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.stopPropagation();
            const parentLi = this.parentElement;
            const submenu = parentLi.querySelector('.submenu-level2');

            if (submenu) {
                event.preventDefault();

                // 关闭所有同级的三级菜单
                parentLi.parentElement.querySelectorAll('.submenu-level2').forEach(sub => {
                    if (sub !== submenu) sub.style.display = 'none';
                });

                // 切换当前三级菜单的显示状态
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                parentLi.classList.toggle('show');

                // 确保三级菜单在二级菜单下方显示
                submenu.style.position = 'static';
            }
        });
    });

    // 当窗口大小变化时，重置所有菜单
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) { 
            clearAllMenus();
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});
