import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { BellRingingIcon } from '@phosphor-icons/react';

import NotificationList from './NotificationList';

const NotificationButton = () => {
  const [openList, setOpenList] = useState(false);

  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <IconButton size="small" onClick={() => setOpenList(!openList)}>
        <BellRingingIcon size={24} color="#fff" weight="duotone" />
      </IconButton>

      {openList && (
        <NotificationList onClose={() => setOpenList(false)} />
      )}
    </Box>
  );
};

export default NotificationButton;
