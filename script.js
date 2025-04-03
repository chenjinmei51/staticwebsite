document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    // 点击汉堡菜单按钮时，切换菜单的显示状态
    hamburger.addEventListener('click', (event) => {
        event.stopPropagation(); // 防止点击事件冒泡，避免触发关闭菜单的逻辑
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
});
