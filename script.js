document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('#menu > li > a');

    // 点击汉堡菜单按钮时，切换菜单的显示状态
    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 点击页面的任意区域关闭菜单
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // ✅ 添加窗口大小变化时自动清除 .active 类名
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) { 
            menu.classList.remove('active');
            hamburger.classList.remove('active');
            document.querySelectorAll('.show').forEach(item => item.classList.remove('show')); // 移除所有展开的二级菜单状态
        }
    });

    // ✅ 二级菜单展开与关闭逻辑
    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            const parentLi = this.parentElement;

            if (parentLi.querySelector('.submenu')) {
                event.preventDefault(); // 阻止链接跳转
                parentLi.classList.toggle('show'); // 切换二级菜单显示状态
            }
        });
    });

    // ✅ 处理三级菜单的展开与关闭（如果存在）
    const submenuItems = document.querySelectorAll('.submenu > li > a');

    submenuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            const parentLi = this.parentElement;

            if (parentLi.querySelector('.submenu-level2')) {
                event.preventDefault();
                parentLi.classList.toggle('show');
            }
        });
    });
});
