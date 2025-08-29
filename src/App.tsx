
import './App.css'
import { MultiStepForm } from './pages/MultipleStepForm'

function App() {

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Data Entry Process</h1>
            <p className="text-muted-foreground">Complete all 7 steps to submit your information</p>
          </div>
          <MultiStepForm />
        </div>
      </div>
    </div>
  )
}

export default App
