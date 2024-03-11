/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useState, useEffect, useCallback } from "react";

export default function DateIdeaGenerator() {
  enum DateType {
    DINNER = "Dinner",
    ADVENTURE = "Adventure",
    MOVIE = "Movie",
  }

  const dateType = [DateType.DINNER, DateType.ADVENTURE, DateType.MOVIE];

  const datePlace = new Map([
    [DateType.DINNER, ["Restaurant", "Cafe", "Street Food"]],
    [DateType.ADVENTURE, ["Hiking", "Amusement Park", "VR Gaming"]],
    [DateType.MOVIE, ["Big Screen", "Cozy Bed", "Drive In"]],
  ]);

  const dateGift = new Map([
    [DateType.DINNER, ["Chocolates", "Flowers", "Jhumkas"]],
    [
      DateType.ADVENTURE,
      ["Personalized Water Bottle", "Matching Hats", "Utility Pouch"],
    ],
    [DateType.MOVIE, ["Popcorn Maker", "Blanket", "Classic Movie Collection"]],
  ]);

  const dateTwist = new Map([
    [
      DateType.DINNER,
      [
        "Taller one pays the bill",
        "Shorter one pays the bill",
        "Last one to finish pays the bill",
      ],
    ],
    [
      DateType.ADVENTURE,
      [
        "Loser cooks",
        "Winner gets free souvenir",
        "Compete against another couple, loser will pay for winner's adventure",
      ],
    ],
    [
      DateType.MOVIE,
      [
        "Watch a flop movie",
        "No cuddling/touching, see who loses first",
        "Roast other's favourite movie",
      ],
    ],
  ]);

  const [type, setType] = useState<DateType | null>();
  const [place, setPlace] = useState<string | null>();
  const [gift, setGift] = useState<string | null>();
  const [twist, setTwist] = useState<string | null>();
  const [jobFailed, setJobFailed] = useState({
    failedStatus: false,
    message: "",
  });

  type Job = () => Promise<void>;

  const [jobQueue, setJobQueue] = useState<Job[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processNextJob = useCallback(() => {
    //execute next job only when first one is done
    if (jobQueue.length > 0 && !isProcessing) {
      setIsProcessing(true);
      const nextJob = jobQueue[0];
      nextJob()
        .then(() => {
          //remove the processed job from the queue
          setJobQueue((currentQueue) => currentQueue.slice(1));
          setIsProcessing(false);
        })
        .catch((error) => {
          console.error("Error processing job:", error);
          const failedJob = jobQueue[0];
          //add failed job to the end of the queue for automatic retry
          setJobQueue((currentQueue) => [...currentQueue.slice(1), failedJob]);
          setIsProcessing(false);
        });
    }

    if (jobQueue.length === 0) {
      setJobFailed({ failedStatus: false, message: "" });
    }
  }, [jobQueue, isProcessing]);

  useEffect(() => {
    processNextJob();
  }, [jobQueue, processNextJob]);

  const addJobToQueue = (job: Job) => {
    setJobQueue((currentQueue) => [...currentQueue, job]);
  };

  const generateDateTwist = (type: DateType) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.5;
        if (shouldFail) {
          reject(new Error("Failed to generate date Twist."));
          setJobFailed({
            failedStatus: true,
            message:
              "Generating date twist failed, don't worry it will retry at the end.",
          });
          return;
        }

        const randomTwists = dateTwist.get(type);
        const randomIndex = Math.floor(Math.random() * randomTwists?.length!);
        const randomDateGift = randomTwists![randomIndex];
        setTwist(randomDateGift);
        resolve();
      }, 1000);
    });
  };

  const generateDateGift = (type: DateType) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.5;
        if (shouldFail) {
          reject(new Error("Failed to generate date gift."));
          setJobFailed({
            failedStatus: true,
            message:
              "Generating date gift failed, don't worry it will retry at the end.",
          });
          return;
        }

        const randomGifts = dateGift.get(type);
        const randomIndex = Math.floor(Math.random() * randomGifts?.length!);
        const randomDateGift = randomGifts![randomIndex];
        setGift(randomDateGift);
        resolve();
      }, 1000);
    });
  };

  const generateDatePlace = (type: DateType) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.5;
        if (shouldFail) {
          reject(new Error("Failed to generate date place."));
          setJobFailed({
            failedStatus: true,
            message:
              "Generating date place failed, don't worry it will retry at the end.",
          });
          return;
        }

        const randomPlaces = datePlace.get(type);
        const randomIndex = Math.floor(Math.random() * randomPlaces?.length!);
        const randomDatePlace = randomPlaces![randomIndex];
        setPlace(randomDatePlace);
        resolve();
      }, 1000);
    });
  };

  const generateDateType = () => {
    setType(null);
    setPlace(null);
    setGift(null);
    setTwist(null);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * dateType.length);
        const randomDateType = dateType[randomIndex];
        setType(randomDateType);
        addJobToQueue(() => generateDatePlace(randomDateType));
        addJobToQueue(() => generateDateGift(randomDateType));
        addJobToQueue(() => generateDateTwist(randomDateType));
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="w-full h-full flex justify-evenly items-start mt-16">
      <div className="w-[40%] h-fit flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Date Idea Generator</h1>

        <button
          onClick={() => addJobToQueue(generateDateType)}
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200  rounded-lg px-8 py-4 text-center flex gap-4 w-fit"
        >
          {isProcessing && (
            <svg
              aria-hidden="true"
              className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
          Plan my date
        </button>

        <ol className="w-full space-y-4 flex flex-col items-start text-2xl">
          <li className="flex items-center text-blue-600  space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 ">
              1
            </span>
            <span>
              <h3 className="font-medium leading-tight">Type</h3>
              <p
                className={`text-2xl text-gray-600 font-bold ${
                  !type && "animate-bounce"
                }`}
              >
                {type || "..."}
              </p>
            </span>
          </li>
          <li className="flex items-center text-blue-600  space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 ">
              2
            </span>
            <span>
              <h3 className="font-medium leading-tight">Place</h3>
              <p
                className={`text-2xl text-gray-600 font-bold ${
                  !place && "animate-bounce"
                }`}
              >
                {place || "..."}
              </p>
            </span>
          </li>
          <li className="flex items-center text-blue-600  space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 ">
              3
            </span>
            <span>
              <h3 className="font-medium leading-tight">Gift</h3>
              <p
                className={`text-2xl text-gray-600 font-bold ${
                  !gift && "animate-bounce"
                }`}
              >
                {gift || "..."}
              </p>
            </span>
          </li>
          <li className="flex items-center text-blue-600  space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 ">
              4
            </span>
            <span>
              <h3 className="font-medium leading-tight">Twist</h3>
              <p
                className={`text-2xl text-gray-600 font-bold ${
                  !twist && "animate-bounce"
                }`}
              >
                {twist || "..."}
              </p>
            </span>
          </li>
        </ol>

        {jobFailed.failedStatus && (
          <div
            id="toast-warning"
            className="absolute bottom-10 left-10 flex items-center w-full max-w-xs p-4 text-gray-400 bg-gray-800 rounded-lg shadow"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
              <span className="sr-only">Warning icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{jobFailed.message}</div>
          </div>
        )}
      </div>
      <div className="w-[40%] h-fit">
        <div className="flex flex-col">
          <p className="font-bold mb-4 text-lg">Name (on your left, iykyk)</p>
          <p className="mb-2">It does the following things: </p>
          <p>1. It randomly selects a Date Type for you.</p>
          <p>
            2. Then based upon the date type, it selects date Place, Gift and
            Twist.
          </p>
          <p className="mt-4 mb-2">
            It uses <span className="font-bold">Queue</span> data structure to
            do this. This is how it works:
          </p>
          <p>
            1. Those 3 things are jobs, they are added to a Job Queue and
            executed one after another.
          </p>
          <p>2. Each job has 50% chances that they'll fail.</p>
          <p>
            3. If they fail then rest of the jobs are executed as it is and the
            failed job is sent at the back of the queue for auto retry.
          </p>
          <p>4. Once a job is done, it is removed from the queue.</p>
          <p>
            5. Benefit of using a job queue is that you don't have the pass the
            next function as a callback function or use an useEffect hook.
          </p>
          <p>
            5. Also this is ideal as the jobs are independent of each other.
          </p>
          <p className="my-4">
            New things I learnt and used for the first time:{" "}
            <span className="font-bold">
              {" "}
              Queue, useCallback hook and Flowbite.
            </span>
          </p>
          <p className="my-4">
            For more details and Source code, visit the GitHub Repo
          </p>
        </div>
      </div>
    </div>
  );
}
