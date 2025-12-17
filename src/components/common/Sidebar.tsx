'use client';

import React, { useMemo, useCallback } from 'react';
import { Menu, Drawer } from 'antd';
import type { MenuProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import type { SidebarProps, SidebarMenuItem } from '@/types';

// =============================================================================
// CONSTANTS
// =============================================================================

/** Default sidebar configuration */
const DEFAULT_CONFIG = {
  WIDTH: 256,
  MOBILE_DRAWER_WIDTH: 280,
  BG_COLOR: 'bg-white',
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Transform SidebarMenuItem[] to Ant Design Menu items format
 */
const transformMenuItems = (
  items: SidebarMenuItem[],
  onMenuClick: (key: string) => void
): MenuProps['items'] => {
  return items.map((item) => {
    // Handle divider type
    if (item.type === 'divider') {
      return { type: 'divider' as const, key: item.key };
    }

    // Handle group type
    if (item.type === 'group') {
      return {
        type: 'group' as const,
        key: item.key,
        label: item.label,
        children: item.children 
          ? transformMenuItems(item.children, onMenuClick) 
          : undefined,
      };
    }

    // Build base menu item
    const menuItem: NonNullable<MenuProps['items']>[number] = {
      key: item.key,
      icon: item.icon,
      danger: item.danger,
      disabled: item.disabled,
      label: item.href ? (
        <Link href={item.href} onClick={() => onMenuClick(item.key)}>
          {item.label}
        </Link>
      ) : (
        item.label
      ),
      children: item.children 
        ? transformMenuItems(item.children, onMenuClick) 
        : undefined,
    };

    return menuItem;
  });
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface BrandingSectionProps {
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const BrandingSection: React.FC<BrandingSectionProps> = ({ logo, title, subtitle }) => {
  if (!logo && !title && !subtitle) return null;

  return (
    <div className="h-16 flex items-center px-4 border-b border-gray-200 shrink-0">
      {logo && <div className="mr-3">{logo}</div>}
      <div className="flex flex-col min-w-0">
        {title && (
          <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
        )}
        {subtitle && (
          <span className="text-xs text-gray-500 truncate">{subtitle}</span>
        )}
      </div>
    </div>
  );
};

interface SidebarContentProps {
  items: MenuProps['items'];
  activeKey: string;
  onMenuClick: (key: string) => void;
  branding?: SidebarProps['branding'];
  footer?: React.ReactNode;
  bgColor: string;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  items,
  activeKey,
  onMenuClick,
  branding,
  footer,
  bgColor,
}) => {
  const handleMenuClick: MenuProps['onClick'] = useCallback(
    (info: { key: string }) => onMenuClick(info.key),
    [onMenuClick]
  );

  return (
    <div className={`h-full flex flex-col ${bgColor}`}>
      {branding && (
        <BrandingSection
          logo={branding.logo}
          title={branding.title}
          subtitle={branding.subtitle}
        />
      )}
      
      <div className="flex-1 overflow-y-auto py-2">
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={handleMenuClick}
          items={items}
          className="border-none"
          style={{ borderRight: 'none', background: 'transparent' }}
        />
      </div>

      {footer && (
        <div className="border-t border-gray-200 p-4 shrink-0">
          {footer}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Reusable Sidebar component with responsive mobile drawer support.
 * 
 * @example
 * ```tsx
 * <Sidebar
 *   items={menuItems}
 *   activeKey="dashboard"
 *   onMenuClick={handleMenuClick}
 *   branding={{ title: 'My App', logo: <LogoIcon /> }}
 *   mobileOpen={isMobileOpen}
 *   onMobileClose={() => setMobileOpen(false)}
 * />
 * ```
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeKey,
  onMenuClick,
  branding,
  width = DEFAULT_CONFIG.WIDTH,
  mobileOpen = false,
  onMobileClose,
  className = '',
  bgColor = DEFAULT_CONFIG.BG_COLOR,
  footer,
}) => {
  // Transform menu items once
  const menuItems = useMemo(
    () => transformMenuItems(items, onMenuClick),
    [items, onMenuClick]
  );

  // Handle menu click with mobile close
  const handleMenuClick = useCallback(
    (key: string) => {
      onMenuClick(key);
      onMobileClose?.();
    },
    [onMenuClick, onMobileClose]
  );

  // Shared content props
  const contentProps: SidebarContentProps = {
    items: menuItems,
    activeKey,
    onMenuClick: handleMenuClick,
    branding,
    footer,
    bgColor,
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile, positioned below header */}
      <aside
        className={`
          hidden md:flex flex-col
          fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]
          border-r border-gray-200
          z-30 ${bgColor} ${className}
        `}
        style={{ width }}
      >
        <SidebarContent {...contentProps} />
      </aside>

      {/* Mobile Drawer - Only renders on mobile */}
      <Drawer
        placement="left"
        onClose={onMobileClose}
        open={mobileOpen}
        size={DEFAULT_CONFIG.MOBILE_DRAWER_WIDTH}
        styles={{
          body: { padding: 0 },
          header: { display: 'none' },
        }}
        closeIcon={<CloseOutlined className="text-gray-500" />}
        className="md:hidden"
        destroyOnClose={false}
      >
        <SidebarContent {...contentProps} />
      </Drawer>
    </>
  );
};

export default Sidebar;
