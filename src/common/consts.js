import { Timer } from 'lucide-react';

export const columns = [
  {
    field: 'image',
    headerName: 'Image',
    width: 250,
    renderCell: (params) => (
      <img src={params.value} alt={params.row.name} className='image' />
    ),
  },
  { field: 'name', headerName: 'Name', width: 250 },
  {
    field: 'instructions',
    headerName: 'Instructions',
    width: 250,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 250,
    renderCell: (params) => (
      <span
        style={{
          background: 'gray',
          borderRadius: '8px',
          padding: '10px',
          color: 'darkblue',
          fontWeight: '600',
        }}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: 'prepTimeMinutes',
    headerName: 'Preparation Time Minutes',
    width: 250,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Timer size={20} />
        Preparation Time
      </span>
    ),
    renderCell: (props) => <span>{props.row.prepTimeMinutes} minutes</span>,
  },
];
