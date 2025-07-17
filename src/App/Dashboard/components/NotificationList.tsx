import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Box, Button, CircularProgress, Divider, IconButton, Typography,
} from '@mui/material';
import { CoinsIcon, TractorIcon, XIcon } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import { DocumentSnapshot } from 'firebase/firestore';
import { formatDate } from 'date-fns';
import { useNavigate } from 'react-router';
import { firebaseNotification } from '@infrastructure/firebase/notification';
import GetAllPaginatedNotificationUseCase from '@usecases/notification/getAllPaginated';
import Notification from '@domain/entities/Notification';

import { KINDS_COLOR, KINDS_LABEL } from '../hooks/notificationKinds';
import { NAVBAR_SIZE } from '../utils/sizes';

type Props = {
  onClose: () => void;
};

const NotificationList = ({ onClose }:Props) => {
  const initialized = useRef(false);

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | undefined>(undefined);

  const onNotificationClick = () => {
    navigate('/dashboard/metas');
    onClose();
  };

  const getNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const getUserCase = new GetAllPaginatedNotificationUseCase(firebaseNotification);
      const data = await getUserCase.execute();
      setNotifications(data.list);
      setLastDoc(data.lastDoc);
      setHasMore(data.hasMore);
    } catch {
      toast.error('Erro ao carregar as metas');
    } finally {
      setLoading(false);
    }
  }, []);

  const getMoreNotifications = async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const getUserCase = new GetAllPaginatedNotificationUseCase(firebaseNotification);
      const data = await getUserCase.execute(lastDoc);

      setNotifications((prev) => [...prev, ...data.list]);
      setLastDoc(data.lastDoc);
      setHasMore(data.hasMore);
    } catch {
      toast.error('Erro ao carregar mais metas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getNotifications();
    }
  }, [getNotifications]);

  return (
    <Box
      position="absolute"
      bgcolor="#fff"
      borderRadius={2}
      paddingY={2}
      zIndex={10}
      top={NAVBAR_SIZE}
      right={0}
      width={{ xs: '100%', md: 320 }}
      maxHeight="100vh"
      sx={{ overflowY: 'auto' }}
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
        paddingX={2}
      >
        <Typography fontWeight={600}>
          Notificações
        </Typography>

        <IconButton
          size="small"
          onClick={onClose}
        >
          <XIcon size={18} />
        </IconButton>
      </Box>

      {notifications.length === 0 && !loading && (
        <Typography variant="body2" color="textSecondary" marginTop={2} align="center" paddingX={2}>
          No momento não há notificações.
        </Typography>
      )}

      {notifications.map((notification, idx) => (
        <React.Fragment key={notification.id}>
          {idx > 0 && (
            <Divider variant="middle" />
          )}

          <Box
            display="flex"
            gap={1.5}
            padding={2}
            onClick={onNotificationClick}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            <Box color={KINDS_COLOR[notification.kind]}>
              {notification.kind === 'SALE' ? (
                <CoinsIcon size={24} weight="duotone" />
              ) : (
                <TractorIcon size={24} weight="duotone" />
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="primary.main" fontWeight={400}>
                Meta de
                {' '}
                <b>
                  {KINDS_LABEL[notification.kind]}
                </b>
                {' '}
                da fazenda
                {' '}
                <b>
                  {notification.farm_name}
                </b>
                {' '}
                atingida!
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {formatDate(notification.created_at, "dd/MM/yyyy 'às' HH:mm'h'")}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      ))}

      {loading && (
        <Box display="flex"  justifyContent="center" marginTop={2} paddingX={2}>
          <CircularProgress size={20} />
        </Box>
      )}

      {hasMore && !loading && (
        <Box marginTop={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={getMoreNotifications}
          >
            Carregar mais
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NotificationList;
