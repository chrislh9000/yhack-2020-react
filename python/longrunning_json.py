import json
from datetime import datetime
def json_creater(longrunning):

    results = []
    for result in longrunning.results:
        alter = {
            "transcript": "",
            "confidence": "",
            "words": []
        }
        alter["transcript"] = result.alternatives[0].transcript
        alter["confidence"] = result.alternatives[0].confidence
    
        # into array of word dictionaries
        for wrd in result.alternatives[0].words:
            temp_dict = {
                "startTime": "",
                "endTime": "",
                "word": ""
            }
            stime = wrd.start_time
            etime = wrd.end_time
            temp_dict["startTime"] = str(stime.total_seconds()) + "s" # TODO: figure out to convert datetime to string in form "0.0s"
            temp_dict["endTime"] = str(etime.total_seconds()) + "s"
            temp_dict["word"] = wrd.word
            alter["words"].append(temp_dict)

        alter2 = []
        alter2.append(alter)
        result2 = {"alternatives": alter2}
        results.append(result2)
    fin_json = {"response": {"results": results}}
    return fin_json
