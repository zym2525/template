import React, { Component } from 'react';

export function getDisplayName<T>(WrappedComponent: React.ComponentType<T>) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}