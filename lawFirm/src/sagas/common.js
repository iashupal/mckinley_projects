import { call, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';

export const FileInsert = function*(Files, bizCode, fileRefID) {
  const state = yield select(state => state);
  const { auth } = state;
  const { MyLFID: LFID } = auth.authUser;
  let fileID = null;
  if (Files && Files.length > 0) {
    const modifiedFiles = Files.filter(file => file.flag === 1 && (file.isModified || file.isModified === 1));
    if (modifiedFiles && modifiedFiles.length > 0) {
      yield call(PostCall, '/file/updateFile', { files: modifiedFiles, fileRefID });
    }

    const result = yield call(PostCall, '/file/createFile', {
      bizCode,
      files: Files,
      LFID,
      fileRefID,
    });
    const data = getAjaxData(result);
    if (!fileRefID) fileID = data.insertId;
    else fileID = data;

    yield call(PostCall, '/ext/file_tagging', { files: Files, LFID });
  } else {
    fileID = fileRefID;
  }

  return fileID;
};

export const FileDelete = function*(key, fileID) {
  // Delete : S3 File Storage.
  yield call(PostCall, '/ext/file_delete', { key });

  // Delete : File Data (DB-mysql)
  const res = yield call(PostCall, '/file/deleteFile', { key, fileID });
  const result = getAjaxData(res);
  return result;
};
