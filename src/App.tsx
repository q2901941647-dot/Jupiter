import { ToastProvider } from './site/Toast';
import { Site } from './site/Site';

function App() {
  return (
    <ToastProvider>
      <Site />
    </ToastProvider>
  );
}

export default App;
