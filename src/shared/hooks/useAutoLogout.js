import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, SESSION_TIMEOUT_MS } from "../slices/authSlice";

/**
 * Auto-logout hook.
 * - Starts a 15-minute inactivity timer when the user is logged in.
 * - Resets the timer on any mouse move, click, keydown, or scroll.
 * - On reload, checks the stored loginTime and sets the timer for the
 *   remaining time (so a fresh 15 min is NOT given on every refresh).
 */
export default function useAutoLogout() {
  const dispatch = useDispatch();
  const { isLoggedin } = useSelector((state) => state.auth);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const startTimer = () => {
    clearTimer();
    // Calculate remaining time based on the stored loginTime
    const loginTime = Number(sessionStorage.getItem("loginTime") || Date.now());
    const elapsed = Date.now() - loginTime;
    const remaining = SESSION_TIMEOUT_MS - elapsed;

    if (remaining <= 0) {
      // Already expired
      dispatch(logout());
      return;
    }

    timerRef.current = setTimeout(() => {
      dispatch(logout());
    }, remaining);
  };

  const resetTimer = () => {
    if (!isLoggedin) return;
    // Update loginTime to now (fresh 15 min from last activity)
    sessionStorage.setItem("loginTime", Date.now().toString());
    startTimer();
  };

  useEffect(() => {
    if (!isLoggedin) {
      clearTimer();
      return;
    }

    // Start timer on mount / login state change
    startTimer();

    // Reset timer on any user activity
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
      clearTimer();
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedin]);
}

