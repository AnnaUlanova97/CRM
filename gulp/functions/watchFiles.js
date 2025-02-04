import { series, paths, watch } from '../config.js';
import devServer from './devServer.js';

/**
 * Функция слежения за изменениями в файлах.
 * @param modules
 */
const watchFiles = (modules) => {
  devServer()
    .then((/** Экземпляр browserSync **/ server) => {
      Object.entries(paths)
        .forEach(([name, paths]) => {
          const fn = modules.find(m => m.name === name).function;

          watch(paths.watch)
            .on('all', () => {
              setTimeout(series(fn, server.reload), 0);
            });
        });
    });
};

export default watchFiles;
