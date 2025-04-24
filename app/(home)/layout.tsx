import "../globals.css";
import React from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing, toPlainText } from "next-sanity";
import { Toaster } from "sonner";
// import { Analytics } from "@vercel/analytics/react";

import DraftModeToast from "@/components/DraftModeToast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LiveErrorBoundary } from "@/components/LiveErrorBoundary";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { GET_NAV_LINKS, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import localFont from "next/font/local";
import ObserverProvider from "@/components/ObserverProvider";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  const navLinks = sanityFetch({ query: GET_NAV_LINKS });

  console.log({ draftMode: isDraftMode });
  return (
    <html lang="en" className={` bg-white text-black`}>
      <body>
        <section className="">
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}

          <LiveErrorBoundary>
            <SanityLive />
          </LiveErrorBoundary>
          {children}
        </section>
        <SpeedInsights />
      </body>
    </html>
  );
}
