import '@testing-library/jest-dom'
import { config } from 'dotenv'

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
config({ path: envFile })

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = ResizeObserver;