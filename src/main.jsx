import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from './component/ErrorBoundary.jsx';
import { Error } from './component/pages/Error';
import { Layout } from './component/Layout';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout>
    <ErrorBoundary fallback={<Error/>}>
    <App />
    </ErrorBoundary>
    </Layout>
  </StrictMode>,
)
