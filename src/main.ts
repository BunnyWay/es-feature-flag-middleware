import * as BunnySDK from "https://esm.sh/@bunny.net/edgescript-sdk@0.11.2";

console.log("Starting server...");

BunnySDK.net.http.servePullZone({ url: "https://echo.free.beeceptor.com/" })
  .onOriginRequest(
    (ctx) => {
      const optFT = ctx.request.headers.get("feature-flags");
      const featureFlags = optFT ? optFT.split(",").map((v) => v.trimStart()) : [];


      // Route-based matching and feature flag check
      const path = new URL(ctx.request.url).pathname;
      if (path === "/d") {
        if (!featureFlags.includes("route-d-preview")) {
          return new Response("You cannot use this route.", { status: 400 });
        }
      }

      return Promise.resolve(ctx.request);
    },
  );
