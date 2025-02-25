'use client';

import type { JSX } from 'react';
import React, {useEffect} from 'react';
import type { TelegramWebAppData } from '@tonsolutions/telemetree-react';
import {
  TrackGroups,
  TwaAnalyticsProvider,
} from '@tonsolutions/telemetree-react';
import WebApp from "@twa-dev/sdk";

function parseTelegramWebAppData(url) {
  const hashIndex = url.indexOf('#');
  if (hashIndex === -1) return null;

  const hashParams = new URLSearchParams(url.slice(hashIndex + 1));
  const tgWebAppData = hashParams.get('tgWebAppData');
  if (!tgWebAppData) return null;

  const decodedData = decodeURIComponent(tgWebAppData);
  const params = new URLSearchParams(decodedData);

  const userJson = params.get('user');
  const user = userJson ? JSON.parse(decodeURIComponent(userJson)) : null;

  const telegramWebAppData: TelegramWebAppData = {
    query_id: params.get('query_id'),
    user: user,
    chat_type: params.get('chat_type'),
    chat_instance: params.get('chat_instance'),
    start_param: params.get('start_param'),
    auth_date: params.get('auth_date'),
    hash: params.get('hash'),
    platform: new URL(url).searchParams.get('tgWebAppPlatform')
  };

  return telegramWebAppData;
}

const Providers: ({ children }: { children: any }) => JSX.Element = ({
  children,
}) => {
  useEffect(() => {
    if (WebApp) {
      WebApp.showAlert('Hey there!');
    }
  }, []);

  const telegramWebAppData = parseTelegramWebAppData(window.location.href);
  return (
    <TwaAnalyticsProvider
      projectId={process.env.NEXT_PUBLIC_TELEMETREE_PROJECT_ID}
      apiKey={process.env.NEXT_PUBLIC_TELEMETREE_API_KEY}
      trackGroup={TrackGroups.HIGH}
      telegramWebAppData={telegramWebAppData as TelegramWebAppData}
    >
      {children}
    </TwaAnalyticsProvider>
  );
};

export default Providers;
