"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const now = new Date();
const scheduleTime = (timeMs, exec) => {
    setTimeout(async () => {
        await exec();
    }, timeMs);
};
const timeSchedule = (expires_in_ms, updated_at) => {
    const expiresInMs = expires_in_ms * 1000;
    const timeElapsed = now.getTime() - updated_at.getTime();
    const timeRemaining = expiresInMs - timeElapsed;
    const scheduleTimeMs = timeRemaining * 0.0; // Agenda para 91% do tempo, executando em 9% restantes
    return scheduleTimeMs;
};
const scheduleUtils = {
    scheduleTime,
    timeSchedule
};
exports.default = scheduleUtils;
