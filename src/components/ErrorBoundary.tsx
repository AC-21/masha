import React from 'react';

type Props = { children: React.ReactNode; fallbackTitle?: string };
type State = { hasError: boolean; error?: any };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] Caught error in subtree', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16 }}>
          <h2 style={{ fontFamily: 'Roboto Mono, monospace', textTransform: 'uppercase', fontSize: 14 }}> 
            {this.props.fallbackTitle || 'Something went wrong'}
          </h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, marginTop: 8 }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children as any;
  }
}
