import type { ReactNode } from 'react';
import { Component } from 'react';
import { Box, Text } from '@/components/0-primitive';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 4 }}>
          <Text variant="title">Something went wrong.</Text>
        </Box>
      );
    }

    return this.props.children;
  }
}
