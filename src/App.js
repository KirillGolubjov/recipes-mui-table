import React, { useEffect } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import {
  Modal,
  Box,
  ThemeProvider,
  CssBaseline,
  Switch,
  CircularProgress,
} from '@mui/material';
import { useThemeStore } from './store/themeStore';
import { useTableStore } from './store/tableStore';

const App = () => {
  const { rows, columns, fetchRows, loading } = useTableStore();
  const { getTheme, darkMode, toggleDarkMode, setDarkMode } = useThemeStore();
  const apiRef = useGridApiRef();
  const theme = getTheme(darkMode);

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

  useEffect(() => {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (isDarkMode !== null) {
      setDarkMode(isDarkMode);
    }
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleStateChange = (params) => {
      localStorage.setItem('initialState', JSON.stringify(params));
    };

    if (!loading) {
      return apiRef.current.subscribeEvent('stateChange', handleStateChange);
    }
  }, [apiRef, loading]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  const handleClose = () => setIsOpen(false);

  const dataGridColumns = React.useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        sortable: true,
        filterable: true,
      })),
    [columns]
  );

  if (loading) {
    return (
      <Box
        sx={{
          ...loadingStyle,
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch checked={darkMode} onChange={handleToggleDarkMode} />
      <DataGrid
        rows={rows}
        columns={dataGridColumns}
        pageSize={10}
        apiRef={apiRef}
        initialState={JSON.parse(localStorage.getItem('initialState')) ?? null}
        onCellClick={(params) => {
          if (params.field === 'image') {
            handleImageClick(params.value);
          }
        }}
        sx={{
          '.MuiDataGrid-cell': {
            ...cellStyle,
            color: darkMode ? 'white' : 'black',
          },
        }}
        getRowHeight={() => 'auto'}
      />
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={{ ...modalStyle }}>
          <img
            src={selectedImage}
            alt=''
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

const cellStyle = {
  minHeight: '100px',
  maxHeight: '300px',
  display: 'flex',
  alignItems: 'center',
  padding: '4px 0',
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  p: 2,
};

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export default App;
