'use client';

import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  return (
    <div className="w-full h-[80vh] bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden relative shadow-inner">
      <TransformWrapper initialScale={1} minScale={0.8} maxScale={4} centerOnInit limitToBounds={false}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 flex flex-col gap-2 select-none">
              <button
                type="button"
                onClick={() => zoomIn()}
                className="p-2 bg-white rounded-lg shadow hover:bg-slate-100 text-slate-600 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => zoomOut()}
                className="p-2 bg-white rounded-lg shadow hover:bg-slate-100 text-slate-600 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => resetTransform()}
                className="p-2 bg-white rounded-lg shadow hover:bg-slate-100 text-slate-600 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" />
                </svg>
              </button>
            </div>

            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full flex items-center justify-center"
            >
              <div className="w-full max-w-[1100px] px-3 md:px-6">
                {children}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default MapContainer;
