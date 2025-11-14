"use client";

import Image from "next/image";
import Link from "next/link";
import { ContentWidth } from "@/components/ContentWidth";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

export const HeaderLayout = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
    <header>
        <div className="flex justify-between items-center p-4">
          <Link href="/">
            <Image
              src="/logo-servitec.png"
              alt="Logo de Servitec Perú"
              width={180}
              height={38}
              priority
            />
          </Link>

          <DrawerTrigger asChild>
            <svg
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="white"
            >
              <path d="M64 160C64 142.3 78.3 128 96 128L480 128C497.7 128 512 142.3 512 160C512 177.7 497.7 192 480 192L96 192C78.3 192 64 177.7 64 160zM128 320C128 302.3 142.3 288 160 288L544 288C561.7 288 576 302.3 576 320C576 337.7 561.7 352 544 352L160 352C142.3 352 128 337.7 128 320zM512 480C512 497.7 497.7 512 480 512L96 512C78.3 512 64 497.7 64 480C64 462.3 78.3 448 96 448L480 448C497.7 448 512 462.3 512 480z" />
            </svg>
          </DrawerTrigger>

          {/*<nav className="hidden lg:flex gap-4">*/}
          {/*  <ul className="flex gap-4">*/}
          {/*    <li>*/}
          {/*      <Link*/}
          {/*        href="/"*/}
          {/*        className="flex gap-1 items-center  p-1 px-2 rounded-full hover:border hover:border-white"*/}
          {/*      >*/}
          {/*        <svg*/}
          {/*          className="w-4 h-4"*/}
          {/*          xmlns="http://www.w3.org/2000/svg"*/}
          {/*          width="512"*/}
          {/*          height="512"*/}
          {/*          viewBox="0 0 512 512"*/}
          {/*        >*/}
          {/*          <path*/}
          {/*            fill="currentColor"*/}
          {/*            d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272h16v176c0 35.3 28.7 64 64 64h288c35.3 0 64-28.7 64-64V272h16c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1zM240 320h32c26.5 0 48 21.5 48 48v96H192v-96c0-26.5 21.5-48 48-48"*/}
          {/*          />*/}
          {/*        </svg>*/}
          {/*        <span>Inicio</span>*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <Link*/}
          {/*        href="/services"*/}
          {/*        className="flex gap-1 items-center  p-1 px-2 rounded-full hover:border hover:border-white"*/}
          {/*      >*/}
          {/*        <svg*/}
          {/*          className="w-4 h-4"*/}
          {/*          xmlns="http://www.w3.org/2000/svg"*/}
          {/*          width="24"*/}
          {/*          height="24"*/}
          {/*          viewBox="0 0 24 24"*/}
          {/*        >*/}
          {/*          <path*/}
          {/*            fill="currentColor"*/}
          {/*            d="M14 15h-4v-2H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6h-8zm6-9h-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v4h20V8a2 2 0 0 0-2-2m-4 0H8V4h8z"*/}
          {/*          />*/}
          {/*        </svg>*/}
          {/*        <span>Servicios</span>*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <Link*/}
          {/*        href="/about"*/}
          {/*        className="flex gap-1 items-center  p-1 px-2 rounded-full hover:border hover:border-white"*/}
          {/*      >*/}
          {/*        <svg*/}
          {/*          className="w-4 h-4"*/}
          {/*          xmlns="http://www.w3.org/2000/svg"*/}
          {/*          width="24"*/}
          {/*          height="24"*/}
          {/*          viewBox="0 0 24 24"*/}
          {/*        >*/}
          {/*          <path*/}
          {/*            fill="currentColor"*/}
          {/*            d="M24 14.6c0 .6-1.2 1-2.6 1.2c-.9-1.7-2.7-3-4.8-3.9c.2-.3.4-.5.6-.8h.8c3.1-.1 6 1.8 6 3.5M6.8 11H6c-3.1 0-6 1.9-6 3.6c0 .6 1.2 1 2.6 1.2c.9-1.7 2.7-3 4.8-3.9zm5.2 1c2.2 0 4-1.8 4-4s-1.8-4-4-4s-4 1.8-4 4s1.8 4 4 4m0 1c-4.1 0-8 2.6-8 5c0 2 8 2 8 2s8 0 8-2c0-2.4-3.9-5-8-5m5.7-3h.3c1.7 0 3-1.3 3-3s-1.3-3-3-3c-.5 0-.9.1-1.3.3c.8 1 1.3 2.3 1.3 3.7c0 .7-.1 1.4-.3 2M6 10h.3C6.1 9.4 6 8.7 6 8c0-1.4.5-2.7 1.3-3.7C6.9 4.1 6.5 4 6 4C4.3 4 3 5.3 3 7s1.3 3 3 3"*/}
          {/*          />*/}
          {/*        </svg>*/}
          {/*        <span>Nosotros</span>*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <Link*/}
          {/*        href="/contact"*/}
          {/*        className="flex gap-1 items-center  p-1 px-2 rounded-full hover:border hover:border-white"*/}
          {/*      >*/}
          {/*        <svg*/}
          {/*          className="w-4 h-4"*/}
          {/*          xmlns="http://www.w3.org/2000/svg"*/}
          {/*          width="24"*/}
          {/*          height="24"*/}
          {/*          viewBox="0 0 24 24"*/}
          {/*        >*/}
          {/*          <path*/}
          {/*            fill="currentColor"*/}
          {/*            d="m10.155 14.773l-.009-.021a7 7 0 0 1-.402-.123l-.01-.004A7 7 0 0 1 5 8a7 7 0 0 1 13.96-.749c.044.412-.296.749-.71.749s-.745-.338-.8-.748a5.501 5.501 0 1 0-7.279 5.937a2 2 0 0 1 3.829.81a2 2 0 0 1-3.845.774m-1.025 1.23a8.5 8.5 0 0 1-3.136-1.988a2.25 2.25 0 0 0-1.99 2.234v.92c0 .572.178 1.13.51 1.596C6.056 20.929 8.58 22 12 22s5.945-1.072 7.49-3.235a2.75 2.75 0 0 0 .513-1.599v-.918a2.25 2.25 0 0 0-2.248-2.25H15.5a3.5 3.5 0 0 1-6.37 2.004M16 8a4 4 0 0 0-1.431-3.066a4 4 0 1 0-4.811 6.379A3.5 3.5 0 0 1 12 10.5c.853 0 1.635.305 2.243.813A4 4 0 0 0 16 8"*/}
          {/*          />*/}
          {/*        </svg>*/}
          {/*        <span>Contacto</span>*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*  </ul>*/}

          {/*  <div className="flex gap-2 items-center">*/}
          {/*    <button className="flex justify-center items-center gap-2 p-1 px-2 box-content md:box-border border border-white hover:bg-green-500 hover:border-green-500">*/}
          {/*      <svg*/}
          {/*        className="w-4 h-4"*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*        width="24"*/}
          {/*        height="24"*/}
          {/*        viewBox="0 0 24 24"*/}
          {/*      >*/}
          {/*        <path*/}
          {/*          fill="currentColor"*/}
          {/*          d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4m-6 4c.22-.72 3.31-2 6-2c2.7 0 5.8 1.29 6 2zM4.74 9H5c0 2.21 1.79 4 4 4s4-1.79 4-4h.26c.27 0 .49-.22.49-.49v-.02a.49.49 0 0 0-.49-.49H13c0-1.48-.81-2.75-2-3.45v.95c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.14C9.68 4.06 9.35 4 9 4s-.68.06-1 .14V5.5c0 .28-.22.5-.5.5S7 5.78 7 5.5v-.95C5.81 5.25 5 6.52 5 8h-.26a.49.49 0 0 0-.49.49v.03c0 .26.22.48.49.48M11 9c0 1.1-.9 2-2 2s-2-.9-2-2zm10.98-2.77l.93-.83l-.75-1.3l-1.19.39c-.14-.11-.3-.2-.47-.27L20.25 3h-1.5l-.25 1.22q-.255.105-.48.27l-1.18-.39l-.75 1.3l.93.83c-.02.17-.02.35 0 .52l-.93.85l.75 1.3l1.2-.38c.13.1.28.18.43.25l.28 1.23h1.5l.27-1.22c.16-.07.3-.15.44-.25l1.19.38l.75-1.3l-.93-.85c.03-.19.02-.36.01-.53M19.5 7.75a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5m-.1 3.04l-.85.28c-.1-.08-.21-.14-.33-.19l-.18-.88h-1.07l-.18.87c-.12.05-.24.12-.34.19l-.84-.28l-.54.93l.66.59c-.01.13-.01.25 0 .37l-.66.61l.54.93l.86-.27c.1.07.2.13.31.18l.18.88h1.07l.19-.87c.11-.05.22-.11.32-.18l.85.27l.54-.93l-.66-.61c.01-.13.01-.25 0-.37l.66-.59zm-1.9 2.6c-.49 0-.89-.4-.89-.89s.4-.89.89-.89s.89.4.89.89s-.4.89-.89.89"*/}
          {/*        />*/}
          {/*      </svg>*/}
          {/*      Servitec Work*/}
          {/*    </button>*/}
          {/*    <button className="flex justify-center items-center gap-2 p-1 px-2 box-content md:box-border border border-white hover:bg-green-500 hover:border-green-500">*/}
          {/*      <svg*/}
          {/*        className="w-4 h-4"*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*        width="24"*/}
          {/*        height="24"*/}
          {/*        viewBox="0 0 24 24"*/}
          {/*      >*/}
          {/*        <path*/}
          {/*          fill="currentColor"*/}
          {/*          d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2M1 3c0 .55.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.67-1.43a.99.99 0 0 0-.9-.57H2c-.55 0-1 .45-1 1m16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2"*/}
          {/*        />*/}
          {/*      </svg>*/}
          {/*      Tienda Servitec*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*</nav>*/}
          <DrawerContent>
            <DrawerHeader>
              <DrawerClose>
                <svg
                  className="w-10 h-10 flex ml-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  fill="white"
                >
                  <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                </svg>
              </DrawerClose>
            </DrawerHeader>
            <div className="space-y-4 px-4">
              <nav>
                <ul className="flex flex-col gap-10 items-center text-2xl">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="active:text-yellow-200"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      onClick={() => setOpen(false)}
                      className="active:text-yellow-200"
                    >
                      Servicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      onClick={() => setOpen(false)}
                      className="active:text-yellow-200"
                    >
                      Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="active:text-yellow-200"
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="w-full flex flex-col items-center gap-4">
                <a
                  href="https://platform.servitecperu.com"
                  className="w-full text-xl text-center bg-yellow-200 p-3 rounded-lg text-black font-semibold"
                >
                  Servitec Work
                </a>
                <a
                  href="https://tiendaservitec.com"
                  className="w-full text-xl text-center bg-yellow-200 p-3 rounded-lg text-black font-semibold"
                >
                  Tienda Servitec
                </a>
              </div>
            </div>
            <DrawerFooter>
              <div>Pie de pagina</div>
            </DrawerFooter>
          </DrawerContent>
        </div>
    </header>
    </Drawer>
  );
};
