'use client'

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 180 },
  { month: 'Mar', users: 240 },
  { month: 'Apr', users: 350 },
  { month: 'May', users: 500 },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="glass-card p-4">
            <h2>1,248</h2>
            <p>Residents Helped</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4">
            <h2>328</h2>
            <p>Jobs Found</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4">
            <h2>196</h2>
            <p>Housing Placements</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4">
            <h2>89%</h2>
            <p>Success Rate</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="mb-4">Community Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="users" stroke="#2563eb" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}