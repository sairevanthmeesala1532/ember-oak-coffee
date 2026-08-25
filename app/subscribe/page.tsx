'use client';

import React, { useState } from 'react';
import Navbar from '../../store/components/Navbar';
import CartDrawer from '../../store/components/CartDrawer';
import { useCartStore } from '../../store/useCartStore';
import { Check, ShoppingBag, ShieldAlert } from 'lucide-react';